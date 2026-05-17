# ═══════════════════════════════════════════════════════════════════════════════
# Makefile — PAM Web UI build, push, and deploy automation
# ═══════════════════════════════════════════════════════════════════════════════

# ─── Variables (override from CLI: make build IMAGE_REGISTRY=myregistry.io) ──
DOCKER_USER := amitbbd
DOCKER_PASSWORD := [PASSWORD]
IMAGE_REGISTRY ?= docker.io/$(DOCKER_USER)
IMAGE_NAME     ?= webui
IMAGE_TAG      ?= 0.1.1
NAMESPACE      ?= pam
HELM_RELEASE   ?= pam-ui
HELM_CHART_DIR := ./helm/pam-webui
DIST_DIR       := ./dist
CHART_NAME     := $(shell grep '^name:' $(HELM_CHART_DIR)/Chart.yaml | awk '{print $$2}')
CHART_VERSION  := $(shell grep '^version:' $(HELM_CHART_DIR)/Chart.yaml | awk '{print $$2}')

# Full image reference
IMAGE := $(IMAGE_REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)
IMAGE_LATEST := $(IMAGE_REGISTRY)/$(IMAGE_NAME):latest

.DEFAULT_GOAL := help

# ─── Help ─────────────────────────────────────────────────────────────────────
.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "  PAM Web UI — Build & Deploy"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "  Variables (current values):"
	@echo "    IMAGE_REGISTRY = $(IMAGE_REGISTRY)"
	@echo "    IMAGE_NAME     = $(IMAGE_NAME)"
	@echo "    IMAGE_TAG      = $(IMAGE_TAG)"
	@echo "    NAMESPACE      = $(NAMESPACE)"
	@echo ""

# ─── Build ────────────────────────────────────────────────────────────────────
.PHONY: build
build: ## Build Docker image (multi-stage, production Angular build)
	@echo "→ Building $(IMAGE)"
	docker build \
		--platform linux/amd64 \
		--tag $(IMAGE) \
		--tag $(IMAGE_LATEST) \
		--label "git.commit=$(shell git rev-parse HEAD 2>/dev/null || echo unknown)" \
		--label "build.date=$(shell date -u +%Y-%m-%dT%H:%M:%SZ)" \
		.
	@echo "✓ Build complete: $(IMAGE)"

# ─── Push ─────────────────────────────────────────────────────────────────────
.PHONY: push
push: build ## Push Docker image to registry
	@echo "→ Pushing $(IMAGE)"
	docker push $(IMAGE)
	docker push $(IMAGE_LATEST)
	@echo "✓ Push complete"

# ─── Lint ─────────────────────────────────────────────────────────────────────
.PHONY: helm-lint
helm-lint: ## Lint the Helm chart
	@echo "→ Linting Helm chart $(HELM_CHART_DIR)"
	helm lint $(HELM_CHART_DIR) --strict
	@echo "✓ Helm lint passed"

# ─── Package ──────────────────────────────────────────────────────────────────
.PHONY: helm-package
helm-package: helm-lint ## Package the Helm chart into dist/
	@mkdir -p $(DIST_DIR)
	@echo "→ Packaging Helm chart into $(DIST_DIR)/"
	helm package $(HELM_CHART_DIR) -d $(DIST_DIR)
	@echo "✓ Helm package complete"

# ----- helm push -----------------------
.PHONY: helm-push
helm-push: helm-package ## Push the Helm chart to the repository
	@echo "→ Pushing Helm chart $(DIST_DIR)/$(CHART_NAME)-$(CHART_VERSION).tgz to repository"
	helm push $(DIST_DIR)/$(CHART_NAME)-$(CHART_VERSION).tgz oci://registry-1.docker.io/$(DOCKER_USER)
	@rm $(DIST_DIR)/$(CHART_NAME)-$(CHART_VERSION).tgz
	@echo "✓ Helm push complete"

# ─── Deploy (local / dev cluster) ─────────────────────────────────────────────
.PHONY: deploy-local
deploy-local: ## Deploy to local cluster via Helm (create namespace if needed)
	@echo "→ Deploying $(HELM_RELEASE) to namespace $(NAMESPACE)"
	helm upgrade --install $(HELM_RELEASE) $(HELM_CHART_DIR) \
		--namespace $(NAMESPACE) \
		--create-namespace \
		--set image.repository=$(IMAGE_REGISTRY)/$(IMAGE_NAME) \
		--set image.tag=$(IMAGE_TAG) \
		--wait \
		--timeout 5m
	@echo "✓ Deployed $(HELM_RELEASE)"

# ─── Diff (requires helm-diff plugin) ────────────────────────────────────────
.PHONY: helm-diff
helm-diff: ## Show diff of pending Helm changes
	helm diff upgrade $(HELM_RELEASE) $(HELM_CHART_DIR) \
		--namespace $(NAMESPACE) \
		--set image.repository=$(IMAGE_REGISTRY)/$(IMAGE_NAME) \
		--set image.tag=$(IMAGE_TAG)

# ─── Status ───────────────────────────────────────────────────────────────────
.PHONY: status
status: ## Show Helm release status
	helm status $(HELM_RELEASE) -n $(NAMESPACE)
	kubectl get pods -n $(NAMESPACE) -l app.kubernetes.io/name=$(IMAGE_NAME)

# ─── Logs ─────────────────────────────────────────────────────────────────────
.PHONY: logs
logs: ## Tail logs from the running pods
	kubectl logs -n $(NAMESPACE) -l app.kubernetes.io/name=$(IMAGE_NAME) -f --max-log-requests=5

# ─── Clean ────────────────────────────────────────────────────────────────────
.PHONY: clean
clean: ## Remove node_modules, dist/, and Docker build cache for this image
	@echo "→ Cleaning build artefacts"
	rm -rf node_modules dist $(DIST_DIR)
	docker rmi $(IMAGE) $(IMAGE_LATEST) 2>/dev/null || true
	@echo "✓ Clean complete"

# ─── All ──────────────────────────────────────────────────────────────────────
.PHONY: all
all: build push helm-package ## Full pipeline: build → push → helm-package
	@echo "✓ All targets complete. Image: $(IMAGE)"

# ─── CI convenience ──────────────────────────────────────────────────────────
.PHONY: ci
ci: helm-lint build push ## Minimal CI pipeline: lint → build → push
