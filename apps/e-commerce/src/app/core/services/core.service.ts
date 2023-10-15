import { Injectable, signal } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { ApiService } from "@app-verse/shared";


@Injectable({
  providedIn: "root",
})
export class CoreService {
  user = signal({ user: '', userId: '', role: '' });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService:ApiService
  ) {}

  showToast(type: "success" | "error" | "info" | "warning", msg: string) {
    this.toastr[type](msg);
  }

  navigateTo(url: any[], option?: NavigationExtras) {
    this.router.navigate(url, option);
  }

  logOut() {

  this.apiService.get('/auth/logout').subscribe({
    next:(res)=>{


      this.user.set({ user: '', userId: '', role: '' });
      this.navigateTo(["/login"]);
    }
  })
  }

  isLogedIn(): boolean {
    if (this.user().userId) {
      return true;
    }
    return false;
  }
}
