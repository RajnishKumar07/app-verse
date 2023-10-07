import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoreService } from '../services';
import { catchError, map, of } from 'rxjs';

export const userDataResolver=
(
apiUrl : string,  redirectTo: string,showToast=false
): ResolveFn<any> =>
(route, state) => {
  const http: HttpClient = inject(HttpClient);
  const coreService=inject(CoreService)
  const userId = coreService.user().userId;
  const finalApiUrl = `${apiUrl}/${userId}`;


  return http.get(finalApiUrl).pipe(
    map((res:any)=>{
      
      return res
    }),
    catchError((error) => {
      // Handle API error here

      // Redirect to the specified error page
      coreService.navigateTo([redirectTo||'/']);

      // Optionally, show a toast message
      if (showToast) {
        coreService.showToast('error',error?.error?.msg||'API Error: Unable to fetch data');
      }

      // Return an empty observable or handle the error as needed
      return of(null);
    })
  );
};
