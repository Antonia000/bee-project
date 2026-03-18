import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { MatTabsModule } from '@angular/material/tabs';
import candlesData from './current/products.v1.json';

type Product = {
  id: string;
  title: string;
  photoUrl: string;
  price: number;
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTabsModule, ProductCardComponent, EmptyStateComponent],
  templateUrl: './products.container.html',
  styleUrl: './products.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContainer {
  protected readonly candles: Product[] = [...candlesData.candles];

  protected onAddToCart(product: Product) {
    console.log('Add to cart:', product);
  }
}
