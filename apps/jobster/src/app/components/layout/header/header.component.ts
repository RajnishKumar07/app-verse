import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Dialog } from "@angular/cdk/dialog";
import { ConfirmComponent, CoreService } from "@app-verse/shared";

@Component({
  selector: "app-verse-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnDestroy {
  collapsed = false;
  dialogRef: any;
  constructor(public coreService: CoreService, private dialog: Dialog) {}
  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  /**
   * To toggle navbar in small device
   */
  toggleNav(): void {
    this.collapsed = !this.collapsed;
  }

  logOut() {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        confirmationTitle: "Confirmation",
        confirmationMessage: "Do you want to logout?",
      },
      width: "25rem",
    });

    this.dialogRef.closed.subscribe((result: string) => {
      if (result === "yes") {
        this.coreService.logOut();
      }
    });
  }
}
