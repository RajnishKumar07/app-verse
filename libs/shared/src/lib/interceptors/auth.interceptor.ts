import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "@app-verse/shared";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: TokenService = inject(TokenService);
  const authToken = tokenService.getToken();
  if (authToken?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
  }
  return next(req);
};
