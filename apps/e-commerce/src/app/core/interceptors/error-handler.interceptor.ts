import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { CoreService } from "../services";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const coreService: CoreService = inject(CoreService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        coreService.showToast("error", error?.error?.msg);
        coreService.navigateTo(["/login"]);
      } else if (error.status === 404) {
        coreService.showToast("error", "Resource not found.");
      } else if (error.status === 500) {
        coreService.showToast("error", "Server error. Please try again later.");
      } else {
        coreService.showToast("error", "An error occurred.");
        coreService.navigateTo(["/login"]);
      }

      // Rethrow the error to propagate it to the components
      return throwError(() => error);
    })
  );
};
