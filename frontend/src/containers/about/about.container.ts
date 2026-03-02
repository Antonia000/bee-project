import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.container.html',
  styleUrl: './about.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutContainer {}

