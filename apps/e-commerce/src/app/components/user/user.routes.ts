import { Route } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { pageDataResolver } from '../../core/resolvers';
import { inject } from '@angular/core';
import { CoreService } from '../../core/services';
import { userDataResolver } from '../../core/resolvers/user-data.resolver';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'edit-profile',
    pathMatch: 'full',
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    resolve: {
      userDetail: userDataResolver('/users', '/'),
    },
  },
];
