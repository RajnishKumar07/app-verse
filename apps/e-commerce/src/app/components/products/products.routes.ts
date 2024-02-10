import { Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

import { pageDataResolver } from '../../core/resolvers';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const PRODUCTS_ROUTES: Route[] = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      productListRes: pageDataResolver('/products', false, '/', false),
    },
    pathMatch: 'full',
  },
  {
    path: 'add-product',
    component: ManageProductComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ManageProductComponent,
    resolve: {
      productDetailRes: pageDataResolver('/products', true, '/'),
    },
  },
  {
    path: 'details/:id',
    component: ProductDetailComponent,
    resolve: {
      productDetailRes: pageDataResolver('/products', true, '/'),
    },
  },
];
