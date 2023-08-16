import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-verse-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export default class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
