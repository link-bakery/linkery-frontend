import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const coreGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const canActivate = authService.token() != '';
  if (!canActivate) {
    await router.navigate(['login']);
  }
  return canActivate;
};
