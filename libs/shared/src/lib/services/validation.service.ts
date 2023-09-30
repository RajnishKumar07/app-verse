import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   * required validatior
   * @param control
   * @returns
   */
  static required: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const value = control.value.toString().trim();
    if (!value) {
      return { required: true };
    }
    return null;
  };

  /**
   * email validator to check valid email
   * @param control
   * @returns
   */
  static email: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = control.value;

    if (!emailPattern.test(value)) {
      return { email: true };
    }

    return emailPattern.test(value) ? null : { email: true };
  };

  static compare(compareControl: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const compareValue = control.root.get(compareControl)?.value;
      return value !== compareValue ? { compare: true } : null;
    };
  }
}
