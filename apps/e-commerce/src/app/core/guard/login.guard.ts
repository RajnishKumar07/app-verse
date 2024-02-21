import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CoreService } from '../services';

export const loginGuard: CanActivateFn = (route, state) => {
  const coreService = inject(CoreService);
  if (coreService.isLogedIn()) {
    coreService.navigateTo(['']);
    return false;
  }
  return true;
};
