import { Component, Input, OnInit } from '@angular/core';

import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CoreService } from '../../../core/services';
import { timer } from 'rxjs';
import { UntilDestroy, } from '@ngneat/until-destroy';
import { ApiService, EqualValidatorDirective, ValidationService } from '@app-verse/shared';
@UntilDestroy()
@Component({
    selector: 'ecom-forgot-password',
    imports: [
        ErrorComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        EqualValidatorDirective
    ],
    templateUrl: './forgot-password.component.html'
})
export default class ForgotPasswordComponent implements OnInit {
  @Input() token!: string;
  @Input() email!: string;
  isSubmitted = false;
  forgetPassword!: FormGroup;
  emailControl = new FormControl('', [ValidationService.required]);
  resetMsg!: string;
  countdown!: number;
  isReset = false;

  compareValidationMessage(compareName: string) {
    return {
      validateEqual: (error:string, field:string) =>
        `${field || 'field'} should be same as ${compareName} .`,
    };
  }
  constructor(
 
    private apiService:ApiService,
    private coreService: CoreService,
    private fb: FormBuilder
  ) {}
  getFormControl(controlName: string) {
    return this.forgetPassword?.controls[controlName];
  }
  ngOnInit(): void {
    this.forgetPassword = this.fb.group({
      email: ['', [ValidationService.required,ValidationService.email]],
    });
    if (this.token) {
      this.forgetPassword.addControl(
        'password',
        this.fb.control('', [ValidationService.required])
      );
      this.forgetPassword.addControl(
        'confirmPassword',
        this.fb.control('', [
          ValidationService.required,
          // ValidationService.compare('password'),
        ])
      );
      this.forgetPassword.patchValue({ email: this.email });

      // this.forgetPassword.controls['password'].valueChanges.pipe(untilDestroyed(this)).subscribe((res)=>{
      //   this.forgetPassword.controls['confirmPassword'].updateValueAndValidity({emitEvent:true,onlySelf:true})
      // })
    }
  }

  /**
   * To send reset password email
   */
  forgotPassword(): void {
    this.isSubmitted = true;
    if (this.forgetPassword.valid) {
      let api = '/auth/forget-password';
      const data = {
        ...this.forgetPassword.value,
      };
      if (this.token) {
        delete data['comparePassword'];
        api = '/auth/reset-password';
        data['token'] = this.token;
      }
      this.apiService.post<{ msg: string }>(api, data).subscribe({
        next: (res: { msg: string }) => {
          this.resetMsg = res?.msg;
          this.coreService.showToast('success', this.resetMsg);
          if (!this.token) {
            const countdownTimer = timer(15, 1000).subscribe((n) => {
              this.countdown = 15 - n;
              if (this.countdown <= 1) {
                this.resetMsg = '';

                countdownTimer.unsubscribe();
              }
            });
          } else {
            this.isReset = true;
            const countdownTimer = timer(15, 1000).subscribe((n) => {
              this.countdown = 15 - n;
              if (this.countdown <= 1) {
                countdownTimer.unsubscribe();
                this.coreService.navigateTo(['/login']);
              }
            });
          }
        },
      });
    }
  }
}
