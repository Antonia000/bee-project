import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.container.html',
  styleUrl: './offers.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersContainer {
  protected readonly offers = [
    { title: 'Bundle Deal', detail: 'Buy 2 candles, get 10% off.' },
    { title: 'Honey Week', detail: 'Free shipping on honey jars over €25.' },
    { title: 'New Customer', detail: '5% off your first order.' },
  ];
}

