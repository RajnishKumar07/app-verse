import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogModule } from '@angular/cdk/dialog';
import {
  apiBaseUrlInterceptor,
  errorHandlerInterceptor,
  loaderInterceptor,
} from './core/interceptors';
import { CoreService, TokenService, initializeApp } from './core/services';
import { ApiService } from '@app-verse/shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding()
      // withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(
      withInterceptors([
        apiBaseUrlInterceptor,
        loaderInterceptor,
        errorHandlerInterceptor,
      ])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ApiService, CoreService, TokenService],
    },
    provideToastr({
      timeOut: 3000,
      easeTime: 300,
      easing: 'easing',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideAnimations(),
    importProvidersFrom(DialogModule),
  ],
};
