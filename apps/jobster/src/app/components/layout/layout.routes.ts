import { Route } from "@angular/router";
import HomeComponent from "./home/home.component";

export const LAYOUT_ROUTES: Route[] = [
  // {
  //   path: "",
  //   loadComponent: () => import("./home/home.component"),
  // },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "jobs",
        pathMatch: "full",
      },
      {
        path: "jobs",
        loadChildren: () =>
          import("../jobs/jobs.routes").then((route) => route.JOBS_ROUTE),
      },
    ],
  },
];
