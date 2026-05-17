export const environment = {
  production: true,
  // Relative URL — both frontend and backend served behind the same Envoy Gateway domain.
  // Browser → Envoy Gateway (443) → /api/* → FastAPI core:5000
  apiBaseUrl: '/api',
};
