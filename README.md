# PAM Web UI

> Angular 18 SPA for the PAM (Privileged Access Management) platform.  
> Served by `nginx-unprivileged` behind Envoy Gateway on Kubernetes.

---

## Architecture

```
Browser
  │
  ▼ HTTPS :443
Envoy Gateway (pam-gateway)
  ├── /api/*   → FastAPI core:5000   (core-route HTTPRoute)
  ├── /docs    → FastAPI core:5000   (core-route HTTPRoute)
  └── /*       → nginx pam-webui:80  (webui-route HTTPRoute)  ← this service
                      │
                      ▼ :8080
                nginx-unprivileged (container)
                      │
                      └── /usr/share/nginx/html (Angular SPA)
```

- **TLS termination** at Envoy Gateway (cert-manager issues certificates)
- **No hardcoded IP** — Angular uses relative `/api` URLs in production
- **JWT Bearer token** in `localStorage` (see security note below)

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 22 |
| Angular CLI | ≥ 18 |
| Docker | ≥ 24 |
| Helm | ≥ 3.14 |
| kubectl | matching cluster |

---

## Local Development

```bash
# Install dependencies
npm ci

# Start dev server with API proxy to localhost:8000
npm start
# Opens http://localhost:4200 — /api calls proxied via proxy.conf.json

# Production build
npm run build:prod
# Output: dist/webui/browser/
```

### Dev API Proxy

`proxy.conf.json` forwards `/api` → `http://localhost:8000` so you can run
FastAPI locally and the Angular dev server simultaneously without CORS issues.

---

## Docker Build

```bash
# Build image (uses multi-stage Dockerfile)
make build IMAGE_REGISTRY=your-registry.io IMAGE_TAG=1.0.0

# Push to registry
make push IMAGE_REGISTRY=your-registry.io IMAGE_TAG=1.0.0

# Or one command:
make all IMAGE_REGISTRY=your-registry.io IMAGE_TAG=1.0.0
```

### Security properties of the image

| Property | Value |
|----------|-------|
| Base image (runtime) | `nginxinc/nginx-unprivileged:1.27-alpine` |
| Runs as UID | 101 (`nginx`) |
| Root filesystem | Read-only (emptyDir mounts for nginx tmp) |
| Linux capabilities | All dropped |
| Server version | Hidden (`server_tokens off`) |
| Secrets in image | None |

---

## Kubernetes Deployment

### 1. Apply the HTTPRoute

```bash
kubectl apply -f k8s/webui-httproute.yaml -n pam
```

### 2. Deploy with Helm

```bash
# Standalone deploy
make deploy-local IMAGE_REGISTRY=your-registry.io IMAGE_TAG=1.0.0

# Or directly:
helm upgrade --install pam-webui ./helm/pam-webui \
  --namespace pam \
  --create-namespace \
  --set image.repository=your-registry.io/pam-webui \
  --set image.tag=1.0.0 \
  --wait
```

### 3. Verify

```bash
kubectl get pods -n pam -l app.kubernetes.io/name=pam-webui
kubectl get httproute webui-route -n pam
curl -k https://example.com/health
```

---

## Helm Chart Reference

### Key `values.yaml` options

| Key | Default | Description |
|-----|---------|-------------|
| `replicaCount` | `2` | Baseline replicas |
| `image.repository` | `your-registry.io/pam-webui` | Image registry path |
| `image.tag` | `latest` | Image tag |
| `autoscaling.enabled` | `true` | Enable HPA |
| `autoscaling.minReplicas` | `2` | Minimum pods |
| `autoscaling.maxReplicas` | `5` | Maximum pods |
| `podDisruptionBudget.minAvailable` | `1` | Pods kept alive during disruption |
| `resources.limits.cpu` | `500m` | CPU limit |
| `resources.limits.memory` | `256Mi` | Memory limit |

---

## Umbrella (Mother) Chart Integration

To deploy `pam-webui` as a subchart alongside the FastAPI `core` backend:

### `mother-chart/Chart.yaml`

```yaml
apiVersion: v2
name: pam
version: 1.0.0
dependencies:
  # Existing FastAPI backend chart
  - name: core
    version: "0.1.0"
    repository: "file://../core/core_chart"

  # Angular Web UI subchart
  - name: pam-webui
    version: "0.1.0"
    repository: "file://../pam-webui/helm/pam-webui"
```

### `mother-chart/values.yaml`

```yaml
# Override pam-webui subchart values
pam-webui:
  replicaCount: 3
  image:
    repository: your-registry.io/pam-webui
    tag: "1.2.0"
  resources:
    limits:
      cpu: "1000m"
      memory: "512Mi"

# Override core subchart values
core:
  replicaCount: 2
  image:
    tag: "2.0.0"
```

### Deploy umbrella chart

```bash
# From the mother chart directory
helm dependency update .

helm upgrade --install pam . \
  --namespace pam \
  --create-namespace \
  --values values.yaml \
  --wait
```

This deploys both `pam-webui` and `core` in a single Helm release.

---

## Security Notes

### JWT Token Storage

`localStorage` is used for token storage for simplicity. For production hardening:

- **Preferred**: Use `httpOnly; SameSite=Strict; Secure` cookies set by the server.  
  This prevents JavaScript XSS from accessing the token.
- If you must use `localStorage`, ensure a strict CSP (`script-src 'self'`) and
  subresource integrity (SRI) on all external scripts.

### Content Security Policy

The nginx `default.conf` sets:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
```

For stricter CSP, remove `'unsafe-inline'` and use Angular's nonce-based CSP support
(requires server-side nonce injection).

---

## Project Structure

```
webui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/           # Login form + glassmorphism UI
│   │   │   └── dashboard/       # User table + stat cards
│   │   ├── services/
│   │   │   ├── auth.service.ts  # JWT lifecycle (signal-based)
│   │   │   └── user.service.ts  # REST client for /api/users
│   │   ├── guards/
│   │   │   └── auth.guard.ts    # Functional route guard
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts   # Attaches Bearer token
│   │   │   └── error.interceptor.ts  # 401/403/500 handling
│   │   ├── models/
│   │   │   └── user.model.ts    # TypeScript interfaces
│   │   ├── app.config.ts        # Standalone providers
│   │   ├── app.routes.ts        # Route definitions
│   │   └── global-error-handler.ts
│   ├── environments/
│   │   ├── environment.ts            # Production (apiBaseUrl: '/api')
│   │   └── environment.development.ts # Dev (apiBaseUrl: 'http://localhost:8000/api')
│   ├── styles.scss              # Material dark theme + global styles
│   ├── index.html
│   └── main.ts                  # Standalone bootstrap
├── nginx/
│   ├── nginx.conf               # Global nginx settings
│   └── default.conf             # SPA routing + security headers
├── helm/pam-webui/              # Helm chart
├── k8s/
│   └── webui-httproute.yaml     # Envoy Gateway HTTPRoute
├── Dockerfile                   # Multi-stage build
├── Makefile                     # Build automation
├── angular.json
├── package.json
├── proxy.conf.json              # Local dev API proxy
└── tsconfig.json
```

---

## License

Proprietary — PAM Platform. All rights reserved.
