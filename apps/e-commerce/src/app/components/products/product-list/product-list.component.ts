import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '@app-verse/shared';
import { CoreService } from '../../../core/services';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'ecom-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
    numOfPages: number;
    totalProducts: number;
  };

  ratings=[1,2,3,4,5];

  constructor(public coreService:CoreService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    console.log('products==========>', this.productListRes);
    if (this.productListRes) {
      this.allProducts = this.productListRes.products;
      this.pagination = {
        numOfPages: this.productListRes.numOfPages,
        totalProducts: this.productListRes.totalProducts,
      };
    }
  }

  getExpectedPrice(price: number): number {
    return price + price * 0.1;
  }

  productDetail(id:string){
    this.coreService.navigateTo([`details/${id}`],{
      relativeTo:this.route
    })
  }
}
