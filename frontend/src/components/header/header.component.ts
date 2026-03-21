import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/services/cart.service';

type NavLink = { label: string; path: string };

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly cart = inject(CartService);

  protected readonly links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Offers', path: '/offers' },
    { label: 'About', path: '/about' },
  ];
}
