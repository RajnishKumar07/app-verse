import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-verse-not-found",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./not-found.component.html",
})
export default class NotFoundComponent {}
