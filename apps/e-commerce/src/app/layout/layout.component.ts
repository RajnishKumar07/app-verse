import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '@app-verse/shared';
import { CoreService } from '../core/services';

@Component({
  selector: 'ecom-layout',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  @ViewChild('layout', { static: true }) layout!: ElementRef;
  brandText = 'E-Commerce';
  menus: { routerLink: string; label: string }[] = [];
  userMenu: {
    label: string;
    routerLink: string;
    iconClass: string;
  }[] = [];
  constructor(private router: Router, public coreService: CoreService) {}

  ngOnInit(): void {
    this.userMenu = [
      {
        label: 'Edit Profile',
        iconClass: 'fa fa-user',
        routerLink: '/user',
      },
      {
        label: 'Update Password',
        iconClass: 'fa fa-lock',
        routerLink: '/user/update-password',
      },
      {
        label: 'Cart',
        iconClass: 'fa fa-shopping-cart',
        routerLink: '/cart',
      },
      {
        label: 'Orders',
        iconClass: 'fa fa-cube',
        routerLink: '/orders',
      },
    ];

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.layout) {
        this.layout.nativeElement.scrollTop = 0;
      }
    });
  }
}
