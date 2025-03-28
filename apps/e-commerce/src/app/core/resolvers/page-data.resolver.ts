import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { catchError, map, of } from 'rxjs';
import { CoreService } from '../services';
import { ApiService, IApiResponse } from '@app-verse/shared';

export const pageDataResolver =
  (
    apiUrl: string,
    useRouteId = true,
    redirectTo: string,
    showToast = false,
    idKey = 'id'
  ): ResolveFn<any> =>
  (route, state) => {
    const apiSerivce: ApiService = inject(ApiService);
    const coreService = inject(CoreService);
    const routeId = useRouteId ? route.params[idKey] : '';
    const finalApiUrl = routeId ? `${apiUrl}/${routeId}` : apiUrl;

    return apiSerivce.get<IApiResponse<any>>(finalApiUrl).pipe(
      map((res: IApiResponse<any>) => {
        return res.data;
      }),
      catchError((error) => {
        // Handle API error here

        // Redirect to the specified error page
        coreService.navigateTo([redirectTo || '/']);

        // Optionally, show a toast message
        if (showToast) {
          coreService.showToast(
            'error',
            error?.error?.message || 'API Error: Unable to fetch data'
          );
        }

        // Return an empty observable or handle the error as needed
        return of(null);
      })
    );
  };
