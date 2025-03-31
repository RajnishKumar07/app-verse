import { Component, Input } from '@angular/core';

import { timer } from 'rxjs';
import { CoreService } from '../../../core/services';
import { ApiService } from '@app-verse/shared';

@Component({
    selector: 'ecom-user-verify-token',
    imports: [],
    templateUrl: './user-verify-token.component.html'
})
export default class UserVerifyTokenComponent {
  @Input() token!: string;
  @Input() email!: string;
  isVerified = false;
  countdown=5;
  constructor(private apiSerivce:ApiService,private coreService:CoreService) {}
  verifyEmail() {
    if (this.email && this.token) {
      const data = {
        verificationToken: this.token,
        email: this.email,
      };
     this.apiSerivce.post('/auth/verify-email', data).subscribe({
        next: (res) => {
          const countdownTimer = timer(0, 1000); // Emit a value every second
          this.isVerified=true
         const subscription= countdownTimer.subscribe(() => {
            if (this.countdown > 1) {
              this.countdown--; 
            } else {
              subscription.unsubscribe();
              this.coreService.navigateTo(['/login']);
            }
          });
        },
        error: (error) => {
          this.isVerified=false;
        },
      });
    }
  }
}
