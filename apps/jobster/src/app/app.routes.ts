import { Route } from "@angular/router";
import { authGuard, loginGuard } from "./core/guard";


export const appRoutes: Route[] = [
  {
    path: "register",
    loadComponent: () => import("./components/register/register.component"),
    canActivate: [loginGuard],
  },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component"),
    canActivate: [loginGuard],
  },
  {
    path: "",
    loadChildren: () =>
      import("./components/layout/layout.routes").then(
        (route) => route.LAYOUT_ROUTES
      ),
    canActivate: [authGuard],
  },
  {
    path: "error",
    loadComponent: () =>
      import("./components/error/not-found/not-found.component"),
  },
  {
    path: "**",
    redirectTo: "error",
    pathMatch: "full",
  },
];
