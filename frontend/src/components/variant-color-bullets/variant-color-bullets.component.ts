import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

const VARIANT_SWATCH_COLORS: Record<string, string> = {
  white: '#f5f3ef',
  nude: '#d4b8a8',
  red: '#b83c3c',
  yellow: '#e6c84d',
  black: '#2f2929',
  blue: '#4a6fa5',
  green: '#5a8f6e',
};

@Component({
  selector: 'app-variant-color-bullets',
  standalone: true,
  templateUrl: './variant-color-bullets.component.html',
  styleUrl: './variant-color-bullets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantColorBulletsComponent {
  @Input({ required: true }) variants: string[] = [];
  @Input({ required: true }) selectedVariant!: string;

  @Output() selectedVariantChange = new EventEmitter<string>();

  protected swatchColor(slug: string): string {
    const key = slug.toLowerCase().trim();
    return VARIANT_SWATCH_COLORS[key] ?? '#c4c4c4';
  }

  protected label(slug: string): string {
    return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  }

  protected select(slug: string) {
    if (slug === this.selectedVariant) return;
    this.selectedVariantChange.emit(slug);
  }
}
