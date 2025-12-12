import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-landingpage-container',
  standalone: false,
  templateUrl: './landingpage-container.component.html',
  styleUrl: './landingpage-container.component.scss',
})
export class LandingpageContainerComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
}
