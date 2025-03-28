import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IListApiResponse, IProduct } from '@app-verse/shared';
import { CoreService } from '../../../core/services';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'ecom-product-list',
  imports: [CommonModule, RouterModule, NgbPaginationModule, NgOptimizedImage],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input() productListRes!: IListApiResponse<IProduct>;

  allProducts!: IProduct[];

  pagination!: {
    currentPage: number;
    totalProducts: number;
    limit: number;
  };

  ratings = [1, 2, 3, 4, 5];

  constructor(
    public coreService: CoreService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    if (this.productListRes) {
      this.allProducts = this.productListRes.items;
      this.pagination = {
        currentPage: 1,
        totalProducts: this.productListRes.pagination.totalItems,
        limit: this.productListRes.pagination.pageSize,
      };
    }
  }

  getExpectedPrice(price: number): number {
    return Number(price) + Number(price) * 0.1;
  }

  productDetail(id: number) {
    this.coreService.navigateTo([`details/${id}`], {
      relativeTo: this.route,
    });
  }

  onPageChange(event: number) {
    this.getProductList(event);
  }

  getProductList(pageNo: number): void {
    const queryParams = {
      page: pageNo,
      limit: this.pagination.limit,
    };
    this.http
      .get<IListApiResponse<IProduct>>('/products', { params: queryParams })
      .subscribe({
        next: (res: IListApiResponse<IProduct>) => {
          this.pagination = {
            ...this.pagination,
            currentPage: res.pagination.currentPage,
            totalProducts: res.pagination.totalItems,
            limit: res.pagination.pageSize,
          };

          this.allProducts = res.items;
        },
      });
  }

  isOutOfStockFn(product: IProduct): boolean {
    return product.inventory - product.reservedProductCount <= 0;
  }
}
