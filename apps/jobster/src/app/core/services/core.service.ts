import { Injectable, signal } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  user = signal({ name: "" });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  showToast(type: "success" | "error" | "info" | "warning", msg: string) {
    this.toastr[type](msg);
  }

  navigateTo(url: any[], option?: NavigationExtras) {
    this.router.navigate(url, option);
  }

  logOut() {
    console.log('logout tokenService',this.tokenService)
    this.tokenService?.removeToken();
    this.user.set({ name: "" });
    this.navigateTo(["/login"]);
  }

  isLogedIn(): boolean {
    if (this.tokenService.getToken()?.token) {
      return true;
    }
    return false;
  }
}
