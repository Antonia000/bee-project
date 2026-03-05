import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

type Product = {
  id: string;
  title: string;
  photoUrl: string;
  price: number;
};

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, MatCardModule, MatButtonModule],
  templateUrl: './products.container.html',
  styleUrl: './products.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContainer {
  protected readonly products: Product[] = [
    {
      id: 'honey-1',
      title: 'Wildflower Honey',
      photoUrl: 'https://picsum.photos/seed/honey/900/650',
      price: 12.99,
    },
    {
      id: 'candle-1',
      title: 'Beeswax Candle',
      photoUrl: 'https://picsum.photos/seed/candle/900/650',
      price: 9.5,
    },
    {
      id: 'pollen-1',
      title: 'Bee Pollen Mix',
      photoUrl: 'https://picsum.photos/seed/pollen/900/650',
      price: 15.75,
    },
    {
      id: 'propolis-1',
      title: 'Propolis Drops',
      photoUrl: 'https://picsum.photos/seed/propolis/900/650',
      price: 18.25,
    },
  ];

  protected onAddToCart(product: Product) {
    console.log('Add to cart:', product);
  }
}
