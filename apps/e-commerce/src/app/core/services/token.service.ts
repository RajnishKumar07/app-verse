import { Injectable } from '@angular/core';
import { IUpdateDetail } from '@app-verse/shared';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  readonly TOKEN_KEY = 'ecomToken';

  constructor() {}

  // Store the token in local storage
  setToken(token: IUpdateDetail): void {
    const data = JSON.stringify(token);
    localStorage.setItem(this.TOKEN_KEY, data);
  }

  // Retrieve the token from local storage
  getToken(): { user: string; userId: string; role: string } | null {
    const data = localStorage.getItem(this.TOKEN_KEY);

    return data ? JSON.parse(data) : null;
  }

  // Remove the token from local storage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
