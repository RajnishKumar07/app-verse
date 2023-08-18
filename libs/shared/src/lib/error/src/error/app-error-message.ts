import { FieldError } from "./form-field-error";

export const APP_ERROR_MESSAGE: FieldError = {
  default: (error, field) => `Validation failed for the ${field || "field"}.`,
  required: (error, field) => `Please enter ${field || "field"}.`,
};
