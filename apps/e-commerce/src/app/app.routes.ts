import { Route } from '@angular/router';
import { authGuard, loginGuard } from './core/guard';

export const appRoutes: Route[] = [
    {
        path: "",
        loadChildren: () =>
          import("./layout/layout.routes").then(
            (route) => route.LAYOUT_ROUTES
          ),
        canActivate: [authGuard],
    },
    {
        path: "register",
        loadComponent: () => import("./components/auth/register/register.component"),
        canActivate: [loginGuard],
    },
    {
      path: "login",
      loadComponent: () => import("./components/auth/login/login.component"),
      canActivate: [loginGuard],
    },
    {
      path: "user/verify-token",
      loadComponent: () => import("./components/auth/user-verify-token/user-verify-token.component"),
      canActivate: [loginGuard],
    },
    {
      path: "forget-password",
      loadComponent: () => import("./components/auth/forgot-password/forgot-password.component"),
      canActivate: [loginGuard],
    },
    {
      path: "user/reset-password",
      loadComponent: () => import("./components/auth/forgot-password/forgot-password.component"),
      canActivate: [loginGuard],
    }
];
