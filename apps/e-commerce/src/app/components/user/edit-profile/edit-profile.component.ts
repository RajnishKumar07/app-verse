import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreService } from '../../../core/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService, IUpdateDetail, IUser, ValidationService } from '@app-verse/shared';
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
  standalone: true,
  imports: [CommonModule, ErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  @Input() userDetail!: { user: IUser };
  constructor(
    private apiService:ApiService,
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
        .post<{ user: IUpdateDetail }>(
          '/users/updateUser',
          this.userForm.getRawValue()
        )
        .pipe(untilDestroyed(this))
        .subscribe((res: { user: IUpdateDetail }) => {
          if (res.user) {
            this.coreService.user.update((user) => {
              return res.user;
            });
            this.coreService.showToast(
              'success',
              'Profile updated successfully.'
            );
          }
        });
    }
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      name: ['', ValidationService.required],
      email: ['', ValidationService.required],
    });
  }

  private patchForm() {
    if (this.userDetail?.user) {
      const { name, email } = this.userDetail.user;
     
      this.userForm.patchValue({ name, email });
      this.userForm.controls['email'].disable({ onlySelf: true });
    }
  }
}
