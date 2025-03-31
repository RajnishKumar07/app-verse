import {
  Component,
  OnInit,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import {
  ApiService,
  ConfirmComponent,
  IOrderCreateRes,
} from '@app-verse/shared';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../../core/services';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ecom-cart',
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styles: [
        `
      .product-image {
        height: 12rem;
        width: 100%;
        object-fit: cover;
        @media screen and (min-width: 1024px) {
          height: 4rem;
          width: 4rem;
        }
      }
    `,
    ]
})
export default class CartComponent implements OnInit {
  shippingFee = 0;
  tax!: Signal<number>;
  subTotal!: Signal<number>;
  totalPrice!: Signal<number>;
  totalItem!: Signal<number>;

  dialogRef!: DialogRef<any, any>;
  constructor(
    public cartService: CartService,
    private apiService: ApiService,
    private dialog: Dialog,
    private coreService: CoreService
  ) {
    effect(() => {
      if (this.totalItem()) {
        this.shippingFee = 199;
      } else {
        this.shippingFee = 0;
      }
    });
  }

  ngOnInit(): void {
    this.getTax();
    this.getSubTotal();
    this.getTotal();
    this.getTotalItem();
  }

  decreaseQuantity(product: string, amount: number): void {
    if (amount > 1)
      this.cartService.updateCartItemQuantity(product, amount - 1);
  }

  increaseQuantity(product: string, amount: number): void {
    this.cartService.updateCartItemQuantity(product, amount + 1);
  }

  placedOrder() {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        confirmationTitle: 'Confirmation',
        confirmationMessage: `Are you sure you want to order ?`,
      },
    });

    this.dialogRef.closed.subscribe((res) => {
      if (res === 'yes') {
        let payload = {
          tax: this.tax(),
          shippingFee: this.shippingFee,
          items: this.cartService.cartItem(),
        };

        this.apiService.post<IOrderCreateRes>('/orders', payload).subscribe({
          next: (res: IOrderCreateRes) => {
            const { clientSecret: paymentIntentId } = res;
            this.apiService
              .post(`/orders/${res.order._id}`, { paymentIntentId })
              .subscribe({
                next: (res) => {
                  this.cartService.resetCart();
                  this.coreService.showToast(
                    'success',
                    'Order placed successfully'
                  );
                },
              });
          },
        });
      }
    });
  }

  private getTotalItem(): void {
    this.totalItem = computed<number>(() => {
      return this.cartService.cartItem().reduce((acc, item) => {
        console.log('getTotalItme');
        acc = acc + item.amount;
        return acc;
      }, 0);
    });
  }

  private getTax(): void {
    this.tax = computed<number>(() => {
      return this.subTotal() * 0.1;
    });
  }

  private getSubTotal(): void {
    this.subTotal = computed(() => {
      let subTotal = 0;
      this.cartService.cartItem().forEach((item) => {
        subTotal += item.amount * item.price;
      });

      return subTotal;
    });
  }

  private getTotal(): void {
    this.totalPrice = computed(() => {
      return this.subTotal() + this.shippingFee + this.tax();
    });
  }
}
