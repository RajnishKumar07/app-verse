import { Injectable, signal } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "./token.service";
import { ApiService } from "@app-verse/shared";


@Injectable({
  providedIn: "root",
})
export class CoreService {
  user = signal({ user: '', userId: '', role: '' });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
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

      this.tokenService?.removeToken();
      this.user.set({ user: '', userId: '', role: '' });
      this.navigateTo(["/login"]);
    }
  })
  }

  isLogedIn(): boolean {
    if (this.tokenService.getToken()?.user) {
      return true;
    }
    return false;
  }
}
