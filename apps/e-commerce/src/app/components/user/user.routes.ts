import { Route } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";



export const USER_ROUTES: Route[] = [
  {
    path: "",
    redirectTo:"edit-profile",
    pathMatch: 'full'
    
  },
  {
    path:"edit-profile",
    component: EditProfileComponent,
  }
];
