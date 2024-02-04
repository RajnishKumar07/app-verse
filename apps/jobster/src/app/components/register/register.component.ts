import { Component } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from "@app-verse/shared/src/lib/error";
import { CoreService, TokenService } from "../../core/services";

@Component({
  selector: "app-verse-register",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorComponent
],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export default class RegisterComponent {
  registerForm!: FormGroup;
  isSubmited = false;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private coreService: CoreService
  ) {
    this.initializeRegisterForm();
  }

  RegisterFn() {
    this.isSubmited = true;
    if (this.registerForm.valid) {
      const { email, password, name } = this.registerForm.value;
      this.httpClient
        .post<{ token: string; user: { name: string } }>("/auth/register", {
          name,
          email,
          password,
        })
        .subscribe({
          next: (res: { token: string; user: { name: string } }) => {
            if (res.token) {
              this.coreService.navigateTo(["./login"]);
              this.coreService.showToast(
                "success",
                "Registered successfully!!"
              );
            }
          },
          error: (err) => {
            console.log("err------->", err);
            this.coreService.showToast("error", err?.error?.msg);
          },
        });
    }
  }

  private initializeRegisterForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required],
      // confirmPassword: ["", Validators.required],
    });
  }
}
