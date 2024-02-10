import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'user',
        loadChildren: () =>
          import('../components/user/user.routes').then(
            (route) => route.USER_ROUTES
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../components/products/products.routes').then(
            (route) => route.PRODUCTS_ROUTES
          ),
      }
    ]
  },
 
];
