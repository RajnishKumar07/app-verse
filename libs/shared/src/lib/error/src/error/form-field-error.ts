export interface FieldError {
  [key: string]: (...args: any[]) => string;
}
