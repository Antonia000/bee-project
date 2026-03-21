import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/services/cart.service';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { QuantityStepperComponent } from '../../components/quantity-stepper/quantity-stepper.component';
import { VariantColorBulletsComponent } from '../../components/variant-color-bullets/variant-color-bullets.component';

import productsData from '../products/current/products.v1.json';

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  photoUrls: string[];
  price: number;
  weight: string;
  variants: string[];
};

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    EmptyStateComponent,
    QuantityStepperComponent,
    VariantColorBulletsComponent,
  ],
  templateUrl: './product-details.container.html',
  styleUrl: './product-details.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsContainer {
  @ViewChild('photoScroller') protected photoScroller?: ElementRef<HTMLDivElement>;
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  protected readonly product: Product | undefined = (() => {
    const route = inject(ActivatedRoute);
    const id = route.snapshot.paramMap.get('productId');
    if (!id) return undefined;
    return (productsData as { candles: Product[] }).candles.find((p) => p.id === id);
  })();

  protected currentIndex = 0;
  protected quantity = 1;
  /** Single-selected variant slug (matches `product.variants` entries). */
  protected selectedVariant = '';

  constructor() {
    const first = this.product?.variants?.[0];
    if (first) this.selectedVariant = first;
  }

  protected scrollToIndex(index: number) {
    const el = this.photoScroller?.nativeElement;
    if (!el || !this.product) return;

    const urls = this.product.photoUrls ?? [];
    const clamped = Math.max(0, Math.min(index, urls.length - 1));
    this.currentIndex = clamped;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  }

  protected onScroll() {
    const el = this.photoScroller?.nativeElement;
    if (!el || !this.product) return;

    const urls = this.product.photoUrls ?? [];
    if (el.clientWidth <= 0 || urls.length <= 0) return;

    const idx = Math.round(el.scrollLeft / el.clientWidth);
    this.currentIndex = Math.max(0, Math.min(idx, urls.length - 1));
  }

  protected prev($event: Event) {
    $event.stopPropagation();
    this.scrollToIndex(this.currentIndex - 1);
  }

  protected next($event: Event) {
    $event.stopPropagation();
    this.scrollToIndex(this.currentIndex + 1);
  }

  protected onQuantityChange(next: number) {
    this.quantity = Math.max(1, next);
  }

  protected onVariantChange(slug: string) {
    this.selectedVariant = slug;
  }

  protected onAddToCart() {
    if (!this.product) return;

    this.cart.addItem({
      productId: this.product.id,
      title: this.product.title,
      subtitle: this.product.subtitle,
      variant: this.selectedVariant || this.product.variants[0] || '',
      quantity: this.quantity,
      unitPrice: this.product.price,
      photoUrl: this.product.photoUrls[0],
      weight: this.product.weight,
    });

    this.router.navigate(['/checkout']);
  }
}
