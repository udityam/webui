import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { GlobalErrorHandler } from './global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone-based change detection with coalescing for better performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router with view transitions (Angular 18+) and input binding
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    // HTTP client with functional interceptors (no need for injection tokens)
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    // Angular Material animations (lazy-loaded)
    provideAnimationsAsync(),

    // Global uncaught error handler
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
