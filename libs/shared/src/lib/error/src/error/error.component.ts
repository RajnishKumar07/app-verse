import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormControl,
  UntypedFormControl,
} from "@angular/forms";
import { ErrorPipe } from "./error.pipe";

@Component({
  selector: "error",
  standalone: true,
  imports: [CommonModule, ErrorPipe],
  template: `
    <div
      [ngClass]="errorClass || 'error-message'"
      *ngIf="control && control.errors"
    >
      {{ control.errors | error: fieldName:errorMessage:errorOrder }}
    </div>
  `,
  styles: [
    `
      .error-message {
        color: #d3002d;
      }
    `,
  ],
})
export class ErrorComponent {
  @Input() control!: UntypedFormControl | AbstractControl;
  @Input() errorMessage!: { [key: string]: () => string };
  @Input() fieldName!: string;
  @Input() errorClass!: string;
  @Input() errorOrder!: string[];
}
