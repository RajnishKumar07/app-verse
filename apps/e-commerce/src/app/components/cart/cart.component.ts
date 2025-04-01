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
  IApiResponse,
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
  ],
})
export default class CartComponent implements OnInit {
  shippingFee = 0;
  // tax!: Signal<number>;
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
    // this.getTax();
    this.getSubTotal();
    this.getTotal();
    this.getTotalItem();
  }

  decreaseQuantity(productId: number, amount: number): void {
    if (amount > 1)
      this.cartService.updateCartItemQuantity(productId, amount - 1);
  }

  increaseQuantity(productId: number, amount: number): void {
    this.cartService.updateCartItemQuantity(productId, amount + 1);
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
        const payload = {
          // tax: this.tax(),
          shippingFee: this.shippingFee,
          items: this.cartService.cartItem(),
        };

        this.apiService
          .post<IApiResponse<{ url: string }>>(
            '/stripe/create-checkout-session',
            {
              order: payload,
              successUrl:
                'http://localhost:5000/orders/success?session_id={CHECKOUT_SESSION_ID}',
              cancelUrl: 'http://localhost:5000/cart',
            }
          )
          .subscribe({
            next: (res: IApiResponse<{ url: string }>) => {
              const { url } = res.data;
              if (url) {
                window.location.href = res.data?.url;
              }
              // this.apiService
              //   .post<IApiResponse<any>>('/stripe/create-checkout-session', {
              //     orderId: res.data.order.id,
              //     successUrl: 'http://localhost:5000/orders',
              //     cancelUrl: 'http://localhost:5000/orders',
              //   })
              //   .subscribe({
              //     next: (res: IApiResponse<any>) => {
              //       console.log('res.------------->', res);
              //       if (res.data?.url) {
              //         window.location.href = res.data?.url;
              //       }
              //     },
              //   });
              // this.apiService
              //   .post(`/orders/${res.data.order.id}`, { paymentIntentId })
              //   .subscribe({
              //     next: (res) => {
              //       this.cartService.resetCart();
              //       this.coreService.showToast(
              //         'success',
              //         'Order placed successfully'
              //       );
              //     },
              //   });
            },
          });
      }
    });
  }

  private getTotalItem(): void {
    this.totalItem = computed<number>(() => {
      return this.cartService.cartItem().reduce((acc, item) => {
        acc = acc + item.amount;
        return acc;
      }, 0);
    });
  }

  // private getTax(): void {
  //   this.tax = computed<number>(() => {
  //     return parseFloat((this.subTotal() * 0.1).toFixed(2));
  //   });
  // }

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
      return this.subTotal() + this.shippingFee;
    });
  }
}
