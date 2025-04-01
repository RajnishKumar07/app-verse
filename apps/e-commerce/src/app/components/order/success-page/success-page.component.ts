import { Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, IApiResponse, IOrder } from '@app-verse/shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ecom-success-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './success-page.component.html',
})
export class SuccessPageComponent implements OnInit {
  session_id = input(null);
  orderDetail = signal<IOrder | null>(null);
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.apiService
      .get<IApiResponse<IOrder>>(
        `/orders/orderDetailBySession/${this.session_id()}`
      )
      .subscribe({
        next: (res: IApiResponse<IOrder>) => {
          this.orderDetail.set(res.data);
        },
      });
  }
}
