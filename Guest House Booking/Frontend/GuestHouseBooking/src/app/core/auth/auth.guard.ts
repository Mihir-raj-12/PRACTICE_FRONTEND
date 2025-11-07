import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // This check MUST match the one in your login component
  if (authService.isLoggedIn() && authService.getRoleFromToken() === 'Admin') {
    // User is logged in AND is an Admin
    return true;
  }

  // Not logged in or not an Admin
  authService.logout(); // Clear any partial login
  router.navigate(['/login']);
  return false;
};