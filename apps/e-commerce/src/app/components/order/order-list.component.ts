import { Component, computed, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder, IOrderCreateRes, IOrderItem } from '@app-verse/shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ecom-order-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  allOrdersRes = input<IOrder[]>();
  allOrders = computed<IOrderItem[] | undefined>(() => {
    return this.allOrdersRes()?.reduce((acc: IOrderItem[], item) => {
      acc = [...acc, ...item.orderItem];
      return acc;
    }, []);
  });
  constructor() {}

  ngOnInit(): void {}
}
