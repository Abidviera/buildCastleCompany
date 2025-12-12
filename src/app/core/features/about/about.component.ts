import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent extends AosBaseComponent {
  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }
}
