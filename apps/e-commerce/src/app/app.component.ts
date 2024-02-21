import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderComponent, LoaderService } from '@app-verse/shared';
import { CoreService } from './core/services';

@Component({
  standalone: true,
  imports: [RouterModule, LoaderComponent],
  selector: 'ecom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-commerce';

  constructor(
    public loaderService: LoaderService,
    private coreService: CoreService
  ) {}
}
