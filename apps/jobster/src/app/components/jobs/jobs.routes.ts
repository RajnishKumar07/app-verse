import { Route } from "@angular/router";
import { ListComponent } from "./list/list.component";

export const JOBS_ROUTE: Route[] = [
  {
    path: "",
    component: ListComponent,
  },
];
