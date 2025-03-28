import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  ApiService,
  EqualValidatorDirective,
  IApiResponse,
  ValidationService,
} from '@app-verse/shared';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import { CoreService } from '../../../core/services';

@Component({
  selector: 'ecom-change-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EqualValidatorDirective,
    ErrorComponent,
  ],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  isSubmited = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService
  ) {}
  compareValidationMessage(compareName: string) {
    return {
      validateEqual: (error: string, field: string) =>
        `${field || 'field'} should be same as ${compareName} .`,
    };
  }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', ValidationService.required],
      newPassword: ['', ValidationService.required],
      confirmPassword: ['', ValidationService.required],
    });
  }

  updatePassword() {
    this.isSubmited = true;
    if (this.passwordForm.valid) {
      const data = this.passwordForm.value;
      delete data['confirmPassword'];
      this.apiService
        .post<IApiResponse<null>>('/users/updateUserPassword', data)
        .subscribe((res: IApiResponse<null>) => {
          if (res?.message) {
            this.coreService.showToast('success', res.message);
          }
        });
    }
  }
}
