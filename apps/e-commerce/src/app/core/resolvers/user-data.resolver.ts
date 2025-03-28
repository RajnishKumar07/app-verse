import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoreService } from '../services';
import { catchError, map, of } from 'rxjs';
import { ApiService, IApiResponse, IUser } from '@app-verse/shared';

export const userDataResolver =
  (apiUrl: string, redirectTo: string, showToast = false): ResolveFn<any> =>
  (route, state) => {
    const apiSerivce: ApiService = inject(ApiService);
    const coreService = inject(CoreService);
    const userId = coreService.user().userId;
    const finalApiUrl = `${apiUrl}/${userId}`;

    return apiSerivce.get<IApiResponse<IUser>>(finalApiUrl).pipe(
      map((res: IApiResponse<IUser>) => {
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
