import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartItem } from './cart.service';

export type CheckoutOrderPayload = {
  customer: {
    name: string;
    email: string;
    city: string;
    address: string;
  };
  items: Array<
    CartItem & {
      lineTotal: number;
    }
  >;
  giftPackaging: boolean;
  giftPackagingFee: number;
  subtotal: number;
  total: number;
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/orders/email';

  placeOrder(payload: CheckoutOrderPayload) {
    return this.http.post(this.endpoint, payload);
  }
}
