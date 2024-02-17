import { Route } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { pageDataResolver } from '../../core/resolvers';

export const ORDER_ROUTES: Route[] = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      allOrdersRes: pageDataResolver('/orders/showAllMyOrders', false, '/'),
    },
  },
];
