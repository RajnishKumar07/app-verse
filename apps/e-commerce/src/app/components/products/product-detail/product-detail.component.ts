import { Component, Input, OnDestroy, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  ConfirmComponent,
  IAddReview,
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
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  @Input() productDetailRes!: { product: IProduct };

  productDetail!: IProduct;
  ratings = [1, 2, 3, 4, 5];
  isAlreadyReviewed = false;

  dialogRef!: DialogRef<any, any>;
  constructor(
    public coreService: CoreService,
    private dialog: Dialog,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  ngOnInit(): void {
    if (this.productDetailRes?.product) {
      this.productDetail = this.productDetailRes.product;
      this.sortProduct();
    }
  }

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
          .get<{ review: IAddReview }>(`/reviews/${reviewId}`)
          .subscribe({
            next: (res: { review: IAddReview }) => {
              reviewModalData['reviewDetails'] = res.review;
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
      const { id: product, name, image, price } = this.productDetail;
      this.cartService.addItemToCart({
        product,
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
      const { id: product, name, image, price } = this.productDetail;
      this.cartService.addItemToCart({
        product,
        name,
        amount: 1,
        price,
        image,
      });

      this.coreService.navigateTo(['/cart']);
    }
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
      .get<{ product: IProduct }>(`/products/${this.id}`)
      .subscribe({
        next: (res: { product: IProduct }) => {
          if (res?.product) {
            this.productDetail = res.product;
            this.sortProduct();
          }
        },
      });
  }

  //To make the review at first of current user
  private sortProduct(): void {
    this.productDetail.reviews.sort((a, b) => {
      if (a.user._id === this.coreService.user().userId) {
        this.isAlreadyReviewed = true;
        return -1;
      } else {
        return 1;
      }
    });
  }
}
