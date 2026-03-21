import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../app/services/cart.service';
import { CheckoutOrderPayload, OrderService } from '../../app/services/order.service';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { QuantityStepperComponent } from '../../components/quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TitleCasePipe,
    MatIconModule,
    EmptyStateComponent,
    QuantityStepperComponent,
  ],
  templateUrl: './checkout.container.html',
  styleUrl: './checkout.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutContainer {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly cart = inject(CartService);
  private readonly orderService = inject(OrderService);

  protected readonly giftPackagingFee = 7;
  protected readonly submitting = signal(false);
  protected readonly submitError = signal('');
  protected readonly submitSuccess = signal(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: ['Ilfov', [Validators.required]],
    address: ['', [Validators.required]],
    giftPackaging: false,
  });

  protected readonly subtotal = computed(() => this.cart.subtotal());

  protected total() {
    return this.subtotal() + (this.form.controls.giftPackaging.value ? this.giftPackagingFee : 0);
  }

  protected updateItemQuantity(productId: string, variant: string, quantity: number) {
    this.cart.updateQuantity(productId, variant, quantity);
  }

  protected removeItem(productId: string, variant: string) {
    this.cart.removeItem(productId, variant);
  }

  protected async submitOrder() {
    this.submitError.set('');
    this.submitSuccess.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const items = this.cart.items();
    if (!items.length) {
      this.submitError.set('Your cart is empty.');
      return;
    }

    const payload: CheckoutOrderPayload = {
      customer: {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        city: this.form.controls.city.value,
        address: this.form.controls.address.value,
      },
      items: items.map((item) => ({
        ...item,
        lineTotal: item.unitPrice * item.quantity,
      })),
      giftPackaging: this.form.controls.giftPackaging.value,
      giftPackagingFee: this.form.controls.giftPackaging.value ? this.giftPackagingFee : 0,
      subtotal: this.subtotal(),
      total: this.total(),
    };

    this.submitting.set(true);
    try {
      await firstValueFrom(this.orderService.placeOrder(payload));
      this.cart.clear();
      this.form.reset({ name: '', email: '', city: 'Ilfov', address: '', giftPackaging: false });
      this.submitSuccess.set(true);
    } catch {
      this.submitError.set(
        'Order endpoint is not available yet. The request payload is ready and being sent to /api/orders/email.',
      );
    } finally {
      this.submitting.set(false);
    }
  }
}
