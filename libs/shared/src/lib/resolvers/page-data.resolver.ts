import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CoreService } from "../services";
import { catchError, map, of } from "rxjs";

export const pageDataResolver =
  (
 apiUrl : string, useRouteId =true, redirectTo: string,showToast=false,idKey='id'
  ): ResolveFn<any> =>
  (route, state) => {
    const http: HttpClient = inject(HttpClient);
    const coreService=inject(CoreService)
    const routeId = useRouteId ? route.params[idKey] : '';
    const finalApiUrl = `${apiUrl}/${routeId}`;
  

    return http.get(finalApiUrl).pipe(
      map((res:any)=>{
        return res?.data
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
