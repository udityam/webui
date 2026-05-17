import { ErrorHandler, Injectable } from '@angular/core';

/**
 * GlobalErrorHandler — catches any uncaught JavaScript/Angular errors.
 * In production, this is where you would send errors to a monitoring service
 * (e.g., Sentry, Datadog RUM, Google Cloud Error Reporting).
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    if (error instanceof Error) {
      console.error('[GlobalErrorHandler] Uncaught error:', error.message, error.stack);
    } else {
      console.error('[GlobalErrorHandler] Unknown error:', error);
    }
    // TODO-production: send to error monitoring service
    // e.g., Sentry.captureException(error);
  }
}
