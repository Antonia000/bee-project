import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './quantity-stepper.component.html',
  styleUrl: './quantity-stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityStepperComponent {
  @Input({ required: true }) quantity!: number;
  @Input() min = 1;

  @Output() quantityChange = new EventEmitter<number>();

  protected decrement() {
    const next = Math.max(this.min, this.quantity - 1);
    this.quantityChange.emit(next);
  }

  protected increment() {
    this.quantityChange.emit(this.quantity + 1);
  }
}
