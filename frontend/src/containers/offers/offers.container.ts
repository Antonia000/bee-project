import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  imports: [RouterLink],
  templateUrl: './offers.container.html',
  styleUrl: './offers.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersContainer {}
