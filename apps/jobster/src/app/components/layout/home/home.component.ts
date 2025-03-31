import { Component, OnInit } from "@angular/core";

import { RouterModule } from "@angular/router";
import {  HeaderComponent } from "@app-verse/shared";
import { CoreService } from "../../../core/services";

@Component({
    selector: "app-verse-home",
    imports: [RouterModule, HeaderComponent],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export default class HomeComponent implements OnInit {
  menus:{ routerLink: string; label: string; }[]=[{
    routerLink:'/jobs',
    label:'All Job'
  }]
  brandText='Jobster'
  constructor(public coreService:CoreService) {}
  ngOnInit(): void {}
}
