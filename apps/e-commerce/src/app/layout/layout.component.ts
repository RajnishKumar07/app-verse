import { Component,OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import {  HeaderComponent } from '@app-verse/shared';
import { CoreService } from '../core/services';

@Component({
  selector: 'ecom-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  brandText="E-Commerce";
  menus:{ routerLink: string; label: string; }[]=[]
  userMenu:{
    label:string;
    routerLink:string;
    iconClass:string;
  }[]=[]
  constructor(public coreService:CoreService){
    
  }

  ngOnInit(): void {
    this.userMenu=[{
      label:'Edit Profile',
      iconClass:'fa fa-user',
      routerLink:'/user'
    },
    {
      label:'Update Password',
      iconClass:'fa fa-lock',
      routerLink:'/user/update-password'
    }
  ]
  }
}
