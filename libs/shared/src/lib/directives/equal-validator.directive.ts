import { Attribute, Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector:
    '[appVerseValidateEqual][formControlName],[appVerseValidateEqual][formControl],[appVerseValidateEqual][ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualValidatorDirective,
      multi: true,
    },
  ],
})
export class EqualValidatorDirective implements Validator {
  constructor(
    @Attribute('appVerseValidateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string
  ) {}

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    // self value
    const v = c.value;

    // control value
    const e = c.root.get(this.validateEqual);

    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: false,
      };
    }

    // value equal and reverse
    if (e && v === e.value && this.isReverse && e.errors) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      const errors = e.errors || {};
      errors['validateEqual'] = false;
      e.setErrors(errors);
    }

    return null;
  }
}
