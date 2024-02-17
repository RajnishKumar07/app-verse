import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '@app-verse/shared';
import { CoreService } from '../../../core/services';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ecom-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPaginationModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input() productListRes!: {
    products: IProduct[];
    numOfPages: number;
    totalProducts: number;
  };
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
      this.allProducts = this.productListRes.products;
      this.pagination = {
        currentPage: 1,
        totalProducts: this.productListRes.totalProducts,
        limit: 10,
      };
    }
  }

  getExpectedPrice(price: number): number {
    return price + price * 0.1;
  }

  productDetail(id: string) {
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
      .get<{
        products: IProduct[];
        numOfPages: number;
        totalProducts: number;
      }>('/products', { params: queryParams })
      .subscribe({
        next: (res: {
          products: IProduct[];
          numOfPages: number;
          totalProducts: number;
        }) => {
          this.pagination = {
            ...this.pagination,
            currentPage: res.numOfPages,
            totalProducts: res.totalProducts,
          };

          this.allProducts = res.products;
        },
      });
  }
}
