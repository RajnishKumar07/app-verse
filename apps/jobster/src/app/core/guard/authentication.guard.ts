import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { CoreService } from "@app-verse/shared";

export const authGuard: CanActivateFn = (route, state) => {
  const coreService: CoreService = inject(CoreService);

  if (coreService.isLogedIn()) {
    return true;
  }

  coreService.navigateTo(["/login"]);
  return false;
};
