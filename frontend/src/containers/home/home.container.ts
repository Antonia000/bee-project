import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIconModule],
  templateUrl: './home.container.html',
  styleUrl: './home.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainer implements OnInit {
  protected readonly isLoading = signal(true);

  ngOnInit() {
    this.preloadImage('/home.jpg').finally(() => this.isLoading.set(false));
  }

  private preloadImage(src: string) {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  }
}
