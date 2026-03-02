import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.container.html',
  styleUrl: './home.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainer {}

