import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder, IOrderCreateRes, IOrderItem } from '@app-verse/shared';

@Component({
  selector: 'ecom-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  @Input() allOrdersRes!: { orders: IOrder[] };
  allOrders!: IOrderItem[];
  constructor() {}

  ngOnInit(): void {
    if (this.allOrdersRes?.orders) {
      this.allOrders = this.allOrdersRes.orders.reduce(
        (acc: IOrderItem[], item) => {
          acc = [...acc, ...item.orderItems];
          return acc;
        },
        []
      );
    }
  }
}
