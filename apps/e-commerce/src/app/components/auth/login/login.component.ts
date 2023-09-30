import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from "@app-verse/shared/src/lib/error";
import { CoreService, TokenService } from "../../../core/services";
import { ValidationService } from "@app-verse/shared";

@Component({
  selector: "ecom-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorComponent,
  ],
  templateUrl: "./login.component.html",
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isSubmited = false;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private coreService: CoreService
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  loginFn() {
    this.isSubmited = true;
    if (this.loginForm.valid) {
      const { username: email, password } = this.loginForm.value;
      this.httpClient
        .post<{ user: { user: string; userId: string; role: string } }>("/auth/login", {
          email,
          password,
        })
        .subscribe({
          next: (res: { user: { user: string; userId: string; role: string } }) => {
            if (res.user) {
              this.coreService.user.set(res.user);
            }
              this.tokenService.setToken(res.user);
              this.coreService.navigateTo(["/"]);
              this.coreService.showToast("success", "Login successfully!!");
          },
         
        });
    }
  }

  private initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", [ValidationService.required,ValidationService.email]],
      password: ["", ValidationService.required],
    });
  }
}
