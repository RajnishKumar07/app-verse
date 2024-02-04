import { Component, Inject } from "@angular/core";

import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
@Component({
  selector: "app-verse-confirm",
  standalone: true,
  imports: [],
  templateUrl: "./confirm.component.html",
})
export class ConfirmComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      confirmationTitle: string;
      confirmationMessage: string;
      confirmButtons?: { text: string; value: string; class: string }[];
    },
    public dialogRef: DialogRef
  ) {
    if (data && !data.confirmButtons?.length) {
      this.data["confirmButtons"] = [
        {
          text: "Yes",
          value: "yes",
          class: "btn   btn-primary rounded-5 px-4 ",
        },
        {
          text: "No",
          value: "no",
          class: "btn  btn-secondary rounded-5 px-4",
        },
      ];
    }
  }

  close(value: string) {
    this.dialogRef?.close(value);
  }
}
