import { Route } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { pageDataResolver } from '../../core/resolvers';
import { SuccessPageComponent } from './success-page/success-page.component';

export const ORDER_ROUTES: Route[] = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      allOrdersRes: pageDataResolver('/orders/showAllMyOrders', false, '/'),
    },
  },
  {
    path: 'success',
    component: SuccessPageComponent,
  },
];
