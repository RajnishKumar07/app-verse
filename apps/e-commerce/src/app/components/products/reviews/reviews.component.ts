import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ApiService,
  ControlsOf,
  IAddReview,
  ValidationService,
} from '@app-verse/shared';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import { CoreService } from '../../../core/services';

@Component({
  selector: 'ecom-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent implements OnInit {
  reviewId!: string;
  productId!: string;
  reviewDetails!: IAddReview;

  reviewForm!: FormGroup<ControlsOf<IAddReview>>;
  isSubmitted = false;

  ratingsSelected = 0;
  ratings = [1, 2, 3, 4, 5];
  ratingErrorMessage = {
    required: () => 'Please select rating',
  };
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA)
    public data: {
      reviewId: string;
      productId: string;
      reviewDetails: IAddReview;
    },
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService
  ) {
    if (data) {
      this.reviewId = data.reviewId;
      this.productId = data.productId;
      this.reviewDetails = data.reviewDetails;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.patchForm(this.reviewDetails);
  }
  manageReview() {
    this.isSubmitted = true;

    if (this.reviewForm.invalid) {
      return;
    }

    const payload = this.reviewForm.getRawValue();
    let url = '/reviews';
    if (this.reviewId) {
      url = `/reviews/${this.reviewId}`;
    } else {
      payload['product'] = this.productId;
    }
    this.apiService.post(url, payload).subscribe({
      next: (res) => {
        if (res) {
          const toastrMsg = `Review ${
            this.reviewId ? 'updated successfully' : 'created successfully'
          }`;
          this.coreService.showToast('success', toastrMsg);
          this.dialogRef.close(true);
        }
      },
    });
  }

  setRatings(rating: number) {
    this.ratingsSelected = rating;
    this.reviewForm.controls['rating'].setValue(rating);
  }

  close(data?: boolean): void {
    this.dialogRef.close(data);
  }

  private initializeForm() {
    this.reviewForm = this.fb.group<ControlsOf<IAddReview>>({
      title: this.fb.nonNullable.control('', [ValidationService.required]),
      comment: this.fb.nonNullable.control(''),
      rating: this.fb.nonNullable.control(null, [ValidationService.required]),
    });
  }

  private patchForm(reviewDetails: IAddReview) {
    if (reviewDetails) {
      const { rating, title, comment } = reviewDetails;
      this.reviewForm.patchValue({ rating, title, comment });
      this.ratingsSelected = rating || 0;
    }
  }
}
