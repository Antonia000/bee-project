import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { QuantityStepperComponent } from '../../components/quantity-stepper/quantity-stepper.component';

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
  imports: [RouterLink, MatIconModule, EmptyStateComponent, QuantityStepperComponent],
  templateUrl: './product-details.container.html',
  styleUrl: './product-details.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsContainer {
  @ViewChild('photoScroller') protected photoScroller?: ElementRef<HTMLDivElement>;

  protected readonly product: Product | undefined = (() => {
    const route = inject(ActivatedRoute);
    const id = route.snapshot.paramMap.get('productId');
    if (!id) return undefined;
    return (productsData as { candles: Product[] }).candles.find((p) => p.id === id);
  })();

  protected currentIndex = 0;
  protected quantity = 1;

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

  protected onAddToCart() {
    if (!this.product) return;
    console.log('Add to cart:', this.product, 'quantity:', this.quantity);
  }
}
