import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Dialog } from "@angular/cdk/dialog";
import { ConfirmComponent } from "@app-verse/shared";

import {  OverlayModule } from "@angular/cdk/overlay";

@Component({
  selector: "app-verse-header",
  standalone: true,
  imports: [CommonModule, RouterModule,OverlayModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnDestroy {
  @Input() welcomeText='Hello';
  @Input() userName='User';
  @Input() brandText!:string;
  @Input({required:true})menus!:{
    routerLink:string,
    label:string;
  }[]
  @Input()userMenu!:{
    label:string;
    routerLink:string;
    iconClass:string;
  }[]

  @Output() logOut:EventEmitter<boolean>=new EventEmitter()
  collapsed = false;
  isUserMenuOpen=false;
  dialogRef: any;

  constructor( private dialog: Dialog) {
    
  }
  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  /**
   * To toggle navbar in small device
   */
  toggleNav(): void {
    this.collapsed = !this.collapsed;
  }

  /**
   * To logout user
   */
  logOutFn():void {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        confirmationTitle: "Confirmation",
        confirmationMessage: "Do you want to logout?",
      },
      width: "25rem",
    });

    this.dialogRef.closed.subscribe((result: string) => {
      if (result === "yes") {
        this.logOut.emit(true)

      }
    });
  }

  
 
}
