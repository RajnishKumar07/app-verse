import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { CoreService } from '../../../core/services';

@Component({
  selector: 'ecom-user-verify-token',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-verify-token.component.html',
})
export default class UserVerifyTokenComponent {
  @Input() token!: string;
  @Input() email!: string;
  isVerified = false;
  countdown=5;
  constructor(private http: HttpClient,private coreService:CoreService) {}
  verifyEmail() {
    if (this.email && this.token) {
      const data = {
        verificationToken: this.token,
        email: this.email,
      };
      this.http.post('/auth/verify-email', data).subscribe({
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
