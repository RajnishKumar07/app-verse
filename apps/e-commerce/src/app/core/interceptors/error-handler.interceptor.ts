import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { CoreService } from "../services";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const coreService: CoreService = inject(CoreService);
  
  const showToast = (error: HttpErrorResponse, message: string) => {
    
    if (req.headers.get('X-Show-Toast') !== 'false') {
      coreService.showToast('error', message);
    }
  };

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        showToast(error, error?.error?.msg);
        coreService.navigateTo(["/login"]);
      } else if (error.status === 404) {
        showToast(error, "Resource not found.");
      } else if (error.status === 500) {
        showToast(error, "Server error. Please try again later.");
      }else if (error.status === 400) {
        showToast(error, error.error.msg||'Bad Request');
      } else {
        showToast(error, "An error occurred.");
        coreService.navigateTo(["/login"]);
      }

      // Rethrow the error to propagate it to the components
      return throwError(() => error);
    })
  );
};
