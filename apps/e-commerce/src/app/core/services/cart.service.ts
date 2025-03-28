import { Injectable, signal } from '@angular/core';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem = signal<
    {
      name: string;
      price: number;
      image: string;
      amount: number;
      productId: number;
    }[]
  >([]);
  constructor(private coreService: CoreService) {}

  /**
   * To add item in cart
   * @param item
   */
  addItemToCart(item: {
    name: string;
    price: number;
    image: string;
    amount: number;
    productId: number;
  }): void {
    this.cartItem.update((cart) => {
      if (item) {
        const isAlreadyExist = cart.find(
          (cartItem) => cartItem.productId === item.productId
        );

        let successToastrMsg = '';
        if (!isAlreadyExist) {
          cart.push(item);
          successToastrMsg = `${item.name} added to your cart.`;
        } else {
          successToastrMsg = `${item.name} is already added to your cart.`;
        }
        this.coreService.showToast('success', successToastrMsg);
      }
      return cart;
    });
  }

  /**
   * To remove item from cart
   * @param product
   */
  removeItemFromCart(productId: number): void {
    this.cartItem.update((cart) => {
      const isItemExistInCart = cart.find(
        (item) => item.productId === productId
      );

      if (isItemExistInCart) {
        const successToastrMsg = `${isItemExistInCart.name} is removed from your cart.`;
        this.coreService.showToast('success', successToastrMsg);

        return cart.filter((item) => item.productId !== productId);
      }

      return cart;
    });
  }

  updateCartItemQuantity(productId: number, amount: number): void {
    this.cartItem.update((cart) => {
      const indx = cart.findIndex((item) => item.productId === productId);
      if (indx > -1) {
        cart[indx].amount = amount;
      }

      return [...cart];
    });
  }

  resetCart(): void {
    this.cartItem.set([]);
  }
}
