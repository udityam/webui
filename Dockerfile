# ═══════════════════════════════════════════════════════════════════════════════
# Multi-stage Dockerfile — PAM Web UI (React 18 + Vite → nginx)
# ═══════════════════════════════════════════════════════════════════════════════
#
# Stage 1 (builder):  node:22-alpine — compile Vite production bundle
# Stage 2 (runtime):  nginxinc/nginx-unprivileged:alpine — serve static files
#
# Security hardening:
#   - Non-root execution throughout
#   - Read-only root filesystem (nginx temp dirs mounted as emptyDir in K8s)
#   - No secrets in image layers
#   - Minimal attack surface (alpine-slim + only necessary packages)
# ═══════════════════════════════════════════════════════════════════════════════

# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Metadata
LABEL stage="builder"

# Run as non-root for build (uid 1000 exists in node:alpine)
USER node

WORKDIR /app

# Copy dependency manifests first (layer-cache optimization)
COPY --chown=node:node package.json package-lock.json* ./

# If a lockfile exists use 'npm ci' (reproducible), otherwise 'npm install'
RUN if [ -f package-lock.json ]; then \
      npm ci --ignore-scripts; \
    else \
      npm install --ignore-scripts; \
    fi

# Copy application source
COPY --chown=node:node . .

# Build production bundle
# Output: dist/ (Vite default output directory)
RUN npm run build

# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
# nginxinc/nginx-unprivileged runs as UID 101 on port 8080 out of the box.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

LABEL maintainer="platform-team@example.com" \
      org.opencontainers.image.title="pam-webui" \
      org.opencontainers.image.description="PAM Platform React Web UI" \
      org.opencontainers.image.vendor="PAM Platform" \
      org.opencontainers.image.licenses="Proprietary"

# Switch to root briefly only to copy files and set permissions
USER root

# Remove default nginx config; we provide our own
RUN rm -f /etc/nginx/conf.d/default.conf \
          /etc/nginx/nginx.conf

# Copy custom nginx configs
COPY nginx/nginx.conf  /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built React app from builder
# Vite outputs to dist/ (unlike Angular's dist/webui/browser)
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Ensure nginx user owns the html dir
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Return to non-root (UID 101 = nginx in nginx-unprivileged)
USER 101

# Expose non-privileged port
EXPOSE 8080

# Healthcheck — mirrors K8s liveness probe
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:8080/health || exit 1

# nginx-unprivileged default CMD is fine; nginx runs in foreground
CMD ["nginx", "-g", "daemon off;"]