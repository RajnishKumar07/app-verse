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
      product: string;
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
    product: string;
  }): void {
    this.cartItem.update((cart) => {
      if (item) {
        const isAlreadyExist = cart.find(
          (cartItem) => cartItem.product === item.product
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
  removeItemFromCart(product: string): void {
    this.cartItem.update((cart) => {
      const isItemExistInCart = cart.find((item) => item.product === product);

      if (isItemExistInCart) {
        const successToastrMsg = `${isItemExistInCart.name} is removed from your cart.`;
        this.coreService.showToast('success', successToastrMsg);

        return cart.filter((item) => item.product !== product);
      }

      return cart;
    });
  }

  updateCartItemQuantity(product: string, amount: number): void {
    this.cartItem.update((cart) => {
      const indx = cart.findIndex((item) => item.product === product);
      if (indx > -1) {
        cart[indx].amount = amount;
      }

      console.log('updateCartItemQuantity========>', cart, amount);
      return [...cart];
    });
  }

  resetCart(): void {
    this.cartItem.set([]);
  }
}
