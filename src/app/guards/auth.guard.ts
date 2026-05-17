import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional auth guard — redirects unauthenticated users to /login.
 * Compatible with Angular 18+ standalone routing.
 */
export const authGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Preserve intended URL for redirect after login
  return router.createUrlTree(['/login']);
};
