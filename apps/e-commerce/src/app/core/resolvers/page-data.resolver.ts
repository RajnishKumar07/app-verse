import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { catchError, map, of } from "rxjs";
import { CoreService } from "../services";

export const pageDataResolver =
  (
 apiUrl : string, useRouteId =true, redirectTo: string,showToast=false,idKey='id'
  ): ResolveFn<any> =>
  (route, state) => {
    const http: HttpClient = inject(HttpClient);
    const coreService=inject(CoreService)
    const routeId = useRouteId ? route.params[idKey] : '';
    const finalApiUrl =routeId? `${apiUrl}/${routeId}`:apiUrl;
    console.log('calling')

    return http.get(finalApiUrl).pipe(
      map((res:any)=>{
        console.log('------->',res)
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
