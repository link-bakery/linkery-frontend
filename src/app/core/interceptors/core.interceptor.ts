import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const newReq = req.clone({
    url: `${environment.backendHost}/__api/` + req.url,
    headers: req.headers.set('authorization', `Bearer ${authService.token()}`),
  });
  return next(newReq);
};
