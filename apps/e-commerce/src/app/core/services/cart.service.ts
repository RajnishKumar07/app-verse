import { Injectable, signal } from '@angular/core';
import { CoreService } from './core.service';
import { ApiService, IApiResponse, ICartItem } from '@app-verse/shared';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem = signal<ICartItem[]>([]);
  constructor(
    private coreService: CoreService,
    private apiService: ApiService
  ) {}

  getCartItem() {
    this.apiService.get<IApiResponse<ICartItem[]>>('/cart').subscribe({
      next: (res: IApiResponse<ICartItem[]>) => {
        this.cartItem.set(res.data);
      },
    });
  }

  /**
   * To add item in cart
   * @param item
   */
  addItemToCart(
    productId: number,
    quantity: number,
    redirectToCart = false
  ): void {
    // this.cartItem.update((cart) => {
    //   if (item) {
    //     const isAlreadyExist = cart.find(
    //       (cartItem) => cartItem.productId === item.productId
    //     );

    //     let successToastrMsg = '';
    //     if (!isAlreadyExist) {
    //       cart.push(item);
    //       successToastrMsg = `${item.name} added to your cart.`;
    //     } else {
    //       successToastrMsg = `${item.name} is already added to your cart.`;
    //     }
    //     this.coreService.showToast('success', successToastrMsg);
    //   }
    //   return cart;
    // });

    this.apiService
      .post<IApiResponse<null>>(`/cart/${productId}`, {
        quantity: quantity,
      })
      .subscribe({
        next: (res: IApiResponse<null>) => {
          this.coreService.showToast('success', res.message);
          if (redirectToCart) {
            this.coreService.navigateTo(['/cart']);
          }
        },
      });
  }

  /**
   * To remove item from cart
   * @param product
   */
  removeItemFromCart(cartId: number): void {
    this.apiService.delete<IApiResponse<null>>(`/cart/${cartId}`).subscribe({
      next: (res: IApiResponse<null>) => {
        this.coreService.showToast('success', res.message);
        this.getCartItem();
      },
    });
  }

  updateCartItemQuantity(productId: number, quantity: number) {
    this.apiService
      .put<IApiResponse<null>>(`/cart/${productId}`, {
        quantity: quantity,
      })
      .subscribe({
        next: (res: IApiResponse<null>) => {
          this.coreService.showToast('success', res.message);
          this.getCartItem();
        },
      });
  }

  resetCart(): void {
    this.cartItem.set([]);
  }
}
