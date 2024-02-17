import { Injectable, effect, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '@app-verse/shared';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  user = signal({ user: '', userId: '', role: '' });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {
    effect(() => {
      if (this.user().userId) {
        this.tokenService.setToken(this.user());
      } else {
        this.tokenService.removeToken();
      }
    });
  }

  showToast(type: 'success' | 'error' | 'info' | 'warning', msg: string) {
    this.toastr[type](msg);
  }

  navigateTo(url: any[], option?: NavigationExtras) {
    this.router.navigate(url, option);
  }

  logOut() {
    this.apiService.get('/auth/logout').subscribe({
      next: (res) => {
        this.user.set({ user: '', userId: '', role: '' });
        this.navigateTo(['/']);
        this.tokenService.removeToken();
      },
    });
  }

  isLogedIn(): boolean {
    if (this.user().userId) {
      return true;
    }
    return false;
  }
}
