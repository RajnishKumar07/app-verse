import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormControl,
  UntypedFormControl,
} from "@angular/forms";
import { ErrorPipe } from "./error.pipe";
import { FieldError } from "./form-field-error";

@Component({
    selector: "error",
    imports: [CommonModule, ErrorPipe],
    template: `
    @if (control && control.errors) {
      <div
        [ngClass]="errorClass || 'error-message'"
        >
        {{ control.errors | error: fieldName:errorMessage:errorOrder }}
      </div>
    }
    `,
    styles: [
        `
      .error-message {
        color: #d3002d;
      }
    `,
    ]
})
export class ErrorComponent {
  @Input() control!: UntypedFormControl | AbstractControl;
  @Input() errorMessage!:FieldError;
  @Input() fieldName!: string;
  @Input() errorClass!: string;
  @Input() errorOrder!: string[];
}
 