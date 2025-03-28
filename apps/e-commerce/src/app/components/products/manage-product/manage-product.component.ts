import {
  Component,
  ElementRef,
  input,
  Input,
  linkedSignal,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  ControlsOf,
  IAddProduct,
  IApiResponse,
  IProduct,
  ValidationService,
} from '@app-verse/shared';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorComponent } from '@app-verse/shared/src/lib/error';
import { CoreService } from '../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'ecom-manage-product',
  imports: [
    CommonModule,
    ErrorComponent,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './manage-product.component.html',
})
export class ManageProductComponent implements OnInit {
  @ViewChild('productImageUpload', { static: true })
  productImageUpload!: ElementRef;
  @Input() id!: number;
  productDetailRes = input<IProduct | null>(null);
  productDetail = linkedSignal<IProduct>(
    () => this.productDetailRes() as IProduct
  );
  productForm!: FormGroup<ControlsOf<IAddProduct>>;
  isSubmitted = false;

  uploadErrorMessage = {
    required: () => 'Please upload image.',
  };

  allCategory = ['office', 'kitchen', 'bedroom', 'cloths'];
  allCompany = ['ikea', 'rodoster', 'marcos', 'EMPORIO ARMANI', 'BLIVE'];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private coreService: CoreService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initializeProductForm();
    if (this.productDetail()?.id) {
      this.patchForm(this.productDetail());
    }
  }

  manageProduct() {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const payload: any = this.productForm.getRawValue();
    payload.price = Number(payload.price);
    const apiUrl = this.productDetail()?.id
      ? `/products/${this.productDetail().id}`
      : '/products';

    this.apiService.post(apiUrl, payload).subscribe({
      next: (res: any) => {
        this.coreService.showToast(
          'success',
          this.productDetail()?.id
            ? 'Product updated successfully'
            : 'Product created successfully'
        );
        this.coreService.navigateTo(['../'], { relativeTo: this.route });
      },
    });
  }

  uploadImage(event: any) {
    const formData = new FormData();
    formData.append('image', event?.target?.files[0]);
    this.apiService
      .post<IApiResponse<any>>('/products/upload', formData)
      .subscribe({
        next: (res: IApiResponse<any>) => {
          this.coreService.showToast(
            'success',
            'Product Image uploaded successfully'
          );
          this.productForm.controls.image.setValue(res?.data.image);
        },
        error: () => {
          this.productForm.controls.image.setValue('');
        },
      });
  }

  private initializeProductForm(): void {
    this.productForm = this.fb.group<ControlsOf<IAddProduct>>({
      name: this.fb.nonNullable.control('', [ValidationService.required]),
      category: this.fb.nonNullable.control(null, ValidationService.required),
      company: this.fb.nonNullable.control(null, ValidationService.required),
      description: this.fb.nonNullable.control('', ValidationService.required),
      image: this.fb.nonNullable.control('', ValidationService.required),
      price: this.fb.nonNullable.control(null, ValidationService.required),
    });
  }

  private patchForm(productDetail: IProduct) {
    const { name, category, company, description, image, price } =
      productDetail;
    this.productForm.patchValue({
      name,
      category,
      company,
      description,
      image,
      price,
    });
  }
}
