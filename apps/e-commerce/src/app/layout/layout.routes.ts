import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authGuard, loginGuard } from '../core/guard';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../components/auth/register/register.component'),
        canActivate: [loginGuard],
      },
      {
        path: 'login',
        loadComponent: () => import('../components/auth/login/login.component'),
        canActivate: [loginGuard],
      },
      {
        path: 'user/verify-token',
        loadComponent: () =>
          import(
            '../components/auth/user-verify-token/user-verify-token.component'
          ),
        canActivate: [loginGuard],
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            '../components/auth/forgot-password/forgot-password.component'
          ),
        canActivate: [loginGuard],
      },
      {
        path: 'user/reset-password',
        loadComponent: () =>
          import(
            '../components/auth/forgot-password/forgot-password.component'
          ),
        canActivate: [loginGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../components/user/user.routes').then(
            (route) => route.USER_ROUTES
          ),
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../components/products/products.routes').then(
            (route) => route.PRODUCTS_ROUTES
          ),
      },
      {
        path: 'cart',
        loadComponent: () => import('../components/cart/cart.component'),
        canActivate: [authGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../components/order/order.routes').then(
            (route) => route.ORDER_ROUTES
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
