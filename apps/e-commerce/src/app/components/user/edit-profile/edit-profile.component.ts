import { Component, input, Input, OnInit } from '@angular/core';

import { CoreService } from '../../../core/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  ApiService,
  IApiResponse,
  IUpdateDetail,
  IUser,
  ValidationService,
} from '@app-verse/shared';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
// import { inject } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'ecom-edit-profile',
  imports: [ErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  userDetail = input<IUser>();
  constructor(
    private apiService: ApiService,
    private coreService: CoreService,
    private fb: FormBuilder
  ) {}
  userForm!: FormGroup;
  isSubmited = false;
  get control() {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.initializeForm();

    this.patchForm();
  }

  editProfile() {
    this.isSubmited = true;
    if (this.userForm.valid) {
      this.apiService
        .put<
          IApiResponse<{
            id: number;
            name: string;
            email: string;
            role: string;
          }>
        >(`/users/${this.userDetail()?.id}`, this.userForm.getRawValue())
        .pipe(untilDestroyed(this))
        .subscribe(
          (
            res: IApiResponse<{
              id: number;
              name: string;
              email: string;
              role: string;
            }>
          ) => {
            if (res.data) {
              const { email, name: user, id: userId, role } = res.data;
              this.coreService.user.update((detail) => {
                return {
                  ...detail,
                  user,
                  userId,
                  role,
                } as IUpdateDetail;
              });
              this.coreService.showToast(
                'success',
                'Profile updated successfully.'
              );
            }
          }
        );
    }
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      name: ['', ValidationService.required],
      email: ['', ValidationService.required],
    });
  }

  private patchForm() {
    if (this.userDetail()) {
      const { name, email } = this.userDetail() as IUser;
      this.userForm.patchValue({ name, email });
      this.userForm.controls['email'].disable({ onlySelf: true });
    }
  }
}
