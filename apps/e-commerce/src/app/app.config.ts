import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from "@angular/platform-browser/animations";
import { DialogModule } from '@angular/cdk/dialog';
import { apiBaseUrlInterceptor, errorHandlerInterceptor, loaderInterceptor } from './core/interceptors';


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
