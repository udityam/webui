import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Error interceptor — handles global HTTP errors.
 *
 * 401 Unauthorized → clears token, redirects to /login
 * 403 Forbidden    → redirects to /login (insufficient permissions)
 * 500+             → logs to console; rethrow for component-level handling
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          // Token expired or invalid — force re-login
          auth.logout();
          break;
        case 403:
          console.warn('[ErrorInterceptor] 403 Forbidden:', req.url);
          router.navigate(['/login']);
          break;
        case 0:
          console.error('[ErrorInterceptor] Network error — is the API reachable?', req.url);
          break;
        default:
          if (error.status >= 500) {
            console.error(`[ErrorInterceptor] Server error ${error.status}:`, error.message);
          }
      }

      // Re-throw so component-level handlers can show user-friendly messages
      return throwError(() => error);
    })
  );
};
