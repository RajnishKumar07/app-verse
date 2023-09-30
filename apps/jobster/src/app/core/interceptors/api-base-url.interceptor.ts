import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "apps/jobster/src/environments/environment";

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes("/assets/")) {
    return next(req);
  }
  const apiReq = req.clone({
    url: environment.apiUrl + req.url,
  });
  return next(apiReq);
};
