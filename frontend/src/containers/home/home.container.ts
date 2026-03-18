import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIconModule],
  templateUrl: './home.container.html',
  styleUrl: './home.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainer {}
