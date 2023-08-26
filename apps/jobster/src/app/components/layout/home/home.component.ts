import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "@app-verse/shared";
import { CoreService } from "../../../core/services/core.service";

@Component({
  selector: "app-verse-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export default class HomeComponent implements OnInit {
  menus:{ routerLink: string; label: string; }[]=[{
    routerLink:'/jobs',
    label:'All Job'
  }]
  constructor(public coreService:CoreService) {}
  ngOnInit(): void {}
}
