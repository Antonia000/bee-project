import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnChanges {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) productId!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) photoUrls: string[] = [];
  @Input({ required: false }) landscape: boolean = false;

  @Output() addToCart = new EventEmitter<void>();

  protected currentIndex = 0;

  @ViewChild('photoScroller') protected photoScroller?: ElementRef<HTMLDivElement>;

  constructor(protected readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['photoUrls']) {
      this.currentIndex = 0;
      // Wait for the template to render the scroller width.
      Promise.resolve().then(() => this.scrollToIndex(0));
    }
  }

  protected navigateToProduct() {
    this.router.navigate(['/products', this.productId]);
  }

  protected scrollToIndex(index: number) {
    const el = this.photoScroller?.nativeElement;
    if (!el) return;

    const clamped = Math.max(0, Math.min(index, this.photoUrls.length - 1));
    this.currentIndex = clamped;

    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  }

  protected onScroll() {
    const el = this.photoScroller?.nativeElement;
    if (!el || el.clientWidth <= 0) return;

    const idx = Math.round(el.scrollLeft / el.clientWidth);
    this.currentIndex = Math.max(0, Math.min(idx, this.photoUrls.length - 1));
  }

  protected prev($event: Event) {
    $event.stopPropagation();
    this.scrollToIndex(this.currentIndex - 1);
  }

  protected next($event: Event) {
    $event.stopPropagation();
    this.scrollToIndex(this.currentIndex + 1);
  }
}
