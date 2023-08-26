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
import { CoreService, TokenService } from "@app-verse/shared";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from "@app-verse/shared/src/lib/error";

@Component({
  selector: "app-verse-login",
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
        .post<{ token: string; user: { name: string } }>("/auth/login", {
          email,
          password,
        })
        .subscribe({
          next: (res: { token: string; user: { name: string } }) => {
            if (res.user) {
              this.coreService.user.set(res.user);
            }
            if (res.token) {
              this.tokenService.setToken(res);
              this.coreService.navigateTo(["/"]);
              this.coreService.showToast("success", "Login successfully!!");
            }
          },
          error: (err) => {
            const msg =
              err?.error?.msg ||
              this.coreService.showToast("error", err?.error?.msg);
          },
        });
    }
  }

  private initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
}
