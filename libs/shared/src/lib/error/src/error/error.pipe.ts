import { Pipe, PipeTransform } from "@angular/core";
import { APP_ERROR_MESSAGE } from "./app-error-message";
import { ValidationErrors } from "@angular/forms";
import { FieldError } from "./form-field-error";
@Pipe({
  name: "error",
  standalone: true,
})
export class ErrorPipe implements PipeTransform {
  transform(
    error: ValidationErrors,
    fieldName: string,
    errorMessages: FieldError,
    order?: string[]
  ) {
    const appErrorMessage = APP_ERROR_MESSAGE;
    const allErrorMessage: FieldError = {
      ...appErrorMessage,
      ...errorMessages,
    };

    const allErrorKeys = Object.keys(error);

    if (order && order.length) {
      allErrorKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    }
    const messageKey = allErrorKeys[0];
    const getMessage = allErrorMessage[messageKey];
    const errorMessage = getMessage
      ? getMessage(error[messageKey], fieldName)
      : allErrorMessage["default"](error[messageKey], fieldName);

    return errorMessage;
  }
}
