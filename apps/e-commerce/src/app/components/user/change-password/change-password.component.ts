import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EqualValidatorDirective, ValidationService } from '@app-verse/shared';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import { CoreService } from '../../../core/services';

@Component({
  selector: 'ecom-change-password',
  standalone: true,
  imports: [
    CommonModule,
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
    private http: HttpClient,
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
      this.http
        .post<{ msg: string }>('/users/updateUserPassword', data)
        .subscribe((res: { msg: string }) => {
         
          if (res?.msg) {
            this.coreService.showToast('success', res.msg);
          }
        });
    }
  }
}
