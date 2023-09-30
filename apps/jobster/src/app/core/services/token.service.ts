import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  readonly TOKEN_KEY = "jobsterToken";

  constructor() {}

  // Store the token in local storage
  setToken(token: { token: string; user: { name: string } }): void {
    const data = JSON.stringify(token);
    localStorage.setItem(this.TOKEN_KEY, data);
  }

  // Retrieve the token from local storage
  getToken(): { token: string; user: { name: string } } | null {
    const data = localStorage.getItem(this.TOKEN_KEY);

    return data ? JSON.parse(data) : null;
  }

  // Remove the token from local storage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
