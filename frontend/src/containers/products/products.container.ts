import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

import { CartService } from '../../app/services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { MatTabsModule } from '@angular/material/tabs';
import candlesData from './current/products.v1.json';

type Product = {
  id: string;
  title: string;
  subtitle: string;
  photoUrls: string[];
  price: number;
  variants: string[];
  weight: string;
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTabsModule, ProductCardComponent, EmptyStateComponent],
  templateUrl: './products.container.html',
  styleUrl: './products.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContainer implements OnInit {
  private readonly cart = inject(CartService);
  protected readonly isLoading = signal(true);

  protected readonly candles: Product[] = [...candlesData.candles];

  ngOnInit() {
    const sources = this.candles
      .map((product) => product.photoUrls?.[0])
      .filter((src): src is string => Boolean(src));

    Promise.all(sources.map((src) => this.preloadImage(src))).finally(() => this.isLoading.set(false));
  }

  protected onAddToCart(product: Product) {
    this.cart.addItem({
      productId: product.id,
      title: product.title,
      subtitle: product.subtitle,
      variant: product.variants.includes('nude') ? 'nude' : (product.variants[0] ?? 'white'),
      quantity: 1,
      unitPrice: product.price,
      photoUrl: product.photoUrls[0],
      weight: product.weight,
    });
  }

  private preloadImage(src: string) {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  }
}
