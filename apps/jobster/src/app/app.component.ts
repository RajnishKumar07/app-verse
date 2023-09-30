import { CommonModule } from "@angular/common";
import { Component, HostListener, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import {  LoaderService } from "@app-verse/shared";
import { CoreService, TokenService } from "./core/services";



@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: "app-verse-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "jobster";

  constructor(
    public loaderService: LoaderService,
    private coreService: CoreService,
    private tokenService: TokenService
  ) {
    const token = tokenService.getToken();
    if (token) {
      coreService.user.set(token.user);
    }
  }
  @HostListener("window:storage", ["$event"])
  onStorageChange(event: StorageEvent): void {
    if (event.key) {
      const tokenKey = this.tokenService.TOKEN_KEY;
      if (event.key === tokenKey) {
        window.location.reload();
      } else {
        this.coreService.logOut();
      }
    } else {
      this.coreService.logOut();
    }
  }
}
