import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  effect,
  input,
  linkedSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  ConfirmComponent,
  IAddReview,
  IApiResponse,
  IProduct,
} from '@app-verse/shared';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreService } from '../../../core/services';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ReviewsComponent } from '../reviews/reviews.component';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'ecom-product-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  productDetailRes = input<IProduct | null>(null);

  productDetail = linkedSignal<IProduct | null>(() => this.productDetailRes());
  ratings = [1, 2, 3, 4, 5];
  isAlreadyReviewed = false;
  isOutOfStock = computed(
    () =>
      (this.productDetail()?.inventory || 0) -
        (this.productDetail()?.reservedProductCount || 0) <=
      0
  );
  dialogRef!: DialogRef<any, any>;
  constructor(
    public coreService: CoreService,
    private dialog: Dialog,
    private apiService: ApiService,
    private cartService: CartService
  ) {
    effect(() => {
      if (this.productDetail()) {
        this.sortProduct();
      }
    });
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  ngOnInit(): void {}

  writeReviews(reviewId?: string): void {
    if (!this.coreService.isLogedIn()) {
      this.dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          confirmationTitle: 'Confirmation',
          confirmationMessage:
            'Please log in to leave a review. Would you like to be redirected to the login page?',
        },
      });

      this.dialogRef.closed.subscribe((res) => {
        if (res === 'yes') {
          this.coreService.navigateTo(['/login']);
        }
      });
    } else {
      const reviewModalData: any = {
        reviewId,
        productId: this.id,
      };
      if (reviewId) {
        this.apiService
          .get<IApiResponse<IAddReview>>(`/reviews/${reviewId}`)
          .subscribe({
            next: (res: IApiResponse<IAddReview>) => {
              reviewModalData['reviewDetails'] = res.data;
              this.openReviewModal(reviewModalData);
            },
          });
      } else {
        this.openReviewModal(reviewModalData);
      }
    }
  }

  deleteReview(id: string): void {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        confirmationTitle: 'Confirmation',
        confirmationMessage:
          'Are you sure,you want to delete this review permanently?',
      },
    });

    this.dialogRef.closed.subscribe((res) => {
      if (res === 'yes') {
        this.apiService.delete(`/reviews/${id}`).subscribe({
          next: (res) => {
            if (res) {
              this.getProductDetail();
              this.coreService.showToast(
                'success',
                'Review deleted successfully!'
              );
            }
          },
        });
      }
    });
  }

  addToCart(): void {
    if (!this.coreService.isLogedIn()) {
      this.dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          confirmationTitle: 'Confirmation',
          confirmationMessage:
            'Please log in to add item in a cart. Would you like to be redirected to the login page?',
        },
      });

      this.dialogRef.closed.subscribe((res) => {
        if (res === 'yes') {
          this.coreService.navigateTo(['/login']);
        }
      });
    } else {
      const {
        id: productId,
        name,
        image,
        price,
      } = this.productDetail() as IProduct;
      this.cartService.addItemToCart({
        productId,
        name,
        amount: 1,
        price,
        image,
      });

      this.coreService.navigateTo(['/cart']);
    }
  }

  buyNow() {
    this.cartService.resetCart();
    if (!this.coreService.isLogedIn()) {
      this.dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          confirmationTitle: 'Confirmation',
          confirmationMessage:
            'Please log in to buy item. Would you like to be redirected to the login page?',
        },
      });

      this.dialogRef.closed.subscribe((res) => {
        if (res === 'yes') {
          this.coreService.navigateTo(['/login']);
        }
      });
    } else {
      const {
        id: productId,
        name,
        image,
        price,
      } = this.productDetail() as IProduct;
      this.cartService.addItemToCart({
        productId,
        name,
        amount: 1,
        price,
        image,
      });

      this.coreService.navigateTo(['/cart']);
    }
  }

  isOutOfStockFn(product: IProduct): boolean {
    return product.inventory - product.reservedProductCount <= 0;
  }

  private openReviewModal(data: any): void {
    this.dialogRef = this.dialog.open(ReviewsComponent, {
      data: data,
      width: '35rem',
    });

    this.dialogRef?.closed?.subscribe((value) => {
      if (value) {
        this.getProductDetail();
      }
    });
  }

  private getProductDetail(): void {
    this.apiService
      .get<IApiResponse<IProduct>>(`/products/${this.id}`)
      .subscribe({
        next: (res: IApiResponse<IProduct>) => {
          if (res?.data) {
            this.productDetail.set(res.data);
          }
        },
      });
  }

  //To make the review at first of current user
  private sortProduct(): void {
    this.productDetail.update((product) => {
      if (product) {
        this.isAlreadyReviewed = false;
        product.reviews.sort((a, b) => {
          if (a.user.id === this.coreService.user().userId) {
            this.isAlreadyReviewed = true;
            return -1;
          } else {
            return 1;
          }
        });
      }
      return product;
    });
  }
}
