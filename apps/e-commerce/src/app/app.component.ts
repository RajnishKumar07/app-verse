import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderComponent, LoaderService } from '@app-verse/shared';
import { CoreService, TokenService } from './core/services';


@Component({
  standalone: true,
  imports: [ CommonModule,RouterModule,LoaderComponent],
  selector: 'ecom-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-commerce';

  constructor(    public loaderService: LoaderService,private tokenService:TokenService,private coreService:CoreService){
    const token = tokenService.getToken();
    if (token) {
      coreService.user.set(token);
    }
  }
}
