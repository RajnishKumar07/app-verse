import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "@app-verse/shared";
import { finalize } from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService: LoaderService = inject(LoaderService);
  loaderService.start();
  console.log("loader");
  return next(req).pipe(finalize(() => loaderService.stop()));
};
