import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { Dialog } from "@angular/cdk/dialog";
import { CoreService, TokenService } from "../../../core/services";
import { ValidationService } from "@app-verse/shared";

@Component({
  selector: "ecom-register",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorComponent,
  ],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export default class RegisterComponent {
  registerForm!: FormGroup;
  isSubmited = false;
  showPassword=false
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private coreService: CoreService,
    private dialog:Dialog,
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
          
              this.coreService.navigateTo(["./login"]);
              this.coreService.showToast(
                "success",
                "Registered successfully! Please check your email to verify your account."
              );

          },
          error: (err) => {
           
            this.coreService.showToast("error", err?.error?.msg);
          },
        });
    }
  }

  private initializeRegisterForm() {
    this.registerForm = this.fb.group({
      name: ["", ValidationService.required],
      email: ["", [ValidationService.required, ValidationService.email]],
      password: ["", ValidationService.required],
    });
  }
}
