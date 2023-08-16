import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

export const pageDataResolver =
  (
    data: { url: string; withId: boolean; redirectTo: string } = {
      url: "",
      withId: true,
      redirectTo: "",
    }
  ): ResolveFn<boolean> =>
  (route, state) => {
    const http: HttpClient = inject(HttpClient);
    const id = route.params["entityId"];
    if (data.withId) {
      data.url = `${data.url}/${id}`;
    }

    http.get(data.url).subscribe();

    return true;
  };
