import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const newReq = req.clone({
    url: 'http://localhost:3000/__api/' + req.url,
    headers: req.headers.set('authorization', `Bearer ${authService.token()}`),
  })
  return next(newReq);
};
