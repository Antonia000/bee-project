import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) photoUrl!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: false }) landscape: boolean = false;

  @Output() addToCart = new EventEmitter<void>();
}
