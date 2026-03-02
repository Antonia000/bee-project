import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type FooterLink = { label: string; path: string };

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly links: FooterLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Offers', path: '/offers' },
    { label: 'About', path: '/about' },
  ];

  protected readonly year = new Date().getFullYear();
}
