import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import { CoreService } from '../../../core/services';
import {
  ApiService,
  IApiResponse,
  IUpdateDetail,
  ValidationService,
} from '@app-verse/shared';

@Component({
  selector: 'ecom-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorComponent,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isSubmited = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  loginFn() {
    this.isSubmited = true;
    if (this.loginForm.valid) {
      const { username: email, password } = this.loginForm.value;
      this.apiService
        .post<
          IApiResponse<{
            user: IUpdateDetail;
          }>
        >('/auth/login', {
          email,
          password,
        })
        .subscribe({
          next: (
            res: IApiResponse<{
              user: IUpdateDetail;
            }>
          ) => {
            if (res.data.user) {
              this.coreService.user.set(res.data.user);
            }

            this.coreService.navigateTo(['/']);
            this.coreService.showToast('success', 'Login successfully!!');
          },
        });
    }
  }

  private initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [ValidationService.required, ValidationService.email]],
      password: ['', ValidationService.required],
    });
  }
}
