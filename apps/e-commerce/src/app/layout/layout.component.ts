import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  HeaderComponent } from '@app-verse/shared';
import { CoreService } from '../core/services';

@Component({
  selector: 'ecom-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  brandText="E-Commerce";
  menus:{ routerLink: string; label: string; }[]=[]
  
  constructor(public coreService:CoreService){}
}
