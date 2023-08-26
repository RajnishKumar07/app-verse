import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CoreService, HeaderComponent } from "@app-verse/shared";

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
