import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withComponentInputBinding,
} from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { DialogModule } from "@angular/cdk/dialog";
import {  authInterceptor, errorHandlerInterceptor, loaderInterceptor } from "@app-verse/shared";
import { apiBaseUrlInterceptor } from "./core/interceptors/api-base-url.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(
      withInterceptors([
        apiBaseUrlInterceptor,
        loaderInterceptor,
        authInterceptor,
        errorHandlerInterceptor,
      ])
    ),
    provideToastr({
      timeOut: 3000,
      easeTime: 300,
      easing: "easing",
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
    provideAnimations(),
    importProvidersFrom(DialogModule),
  ],
};
