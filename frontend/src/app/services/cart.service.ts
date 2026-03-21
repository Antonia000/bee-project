import { Injectable, computed, signal } from '@angular/core';

export type CartItem = {
  productId: string;
  title: string;
  subtitle?: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  photoUrl: string;
  weight?: string;
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  );

  addItem(item: CartItem) {
    this._items.update((items) => {
      const existingIndex = items.findIndex(
        (candidate) => candidate.productId === item.productId && candidate.variant === item.variant
      );

      if (existingIndex === -1) {
        return [...items, item];
      }

      return items.map((candidate, index) =>
        index === existingIndex
          ? { ...candidate, quantity: candidate.quantity + item.quantity }
          : candidate
      );
    });
  }

  updateQuantity(productId: string, variant: string, quantity: number) {
    const nextQuantity = Math.max(1, quantity);
    this._items.update((items) =>
      items.map((item) =>
        item.productId === productId && item.variant === variant
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  }

  removeItem(productId: string, variant: string) {
    this._items.update((items) =>
      items.filter((item) => !(item.productId === productId && item.variant === variant))
    );
  }

  clear() {
    this._items.set([]);
  }
}
