import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent extends AosBaseComponent {
  services: Service[] = [
    {
      icon: 'bi-clipboard-check',
      title: 'Planning, Contracting & Supervision',
      description:
        'Comprehensive project management from initial planning through construction supervision, ensuring quality at every stage.',
    },
    {
      icon: 'bi-calculator',
      title: 'Estimation',
      description:
        'Detailed and accurate cost estimation services to help you plan your budget effectively and avoid surprises.',
    },
    {
      icon: 'bi-file-earmark-check',
      title: 'Approval & Completion Drawings',
      description:
        'Professional architectural drawings for all approvals, ensuring compliance with regulations.',
    },
    {
      icon: 'bi-palette',
      title: 'Interior & Exterior Designing',
      description:
        'Creative and functional design solutions blending aesthetics with practicality.',
    },
    {
      icon: 'bi-wrench-adjustable',
      title: 'Renovation Work',
      description:
        'Expert renovation services to modernize your spaces with minimal disruption.',
    },
    {
      icon: 'bi-flower3',
      title: 'Landscaping',
      description:
        'Beautiful landscape design and implementation for perfect outdoor spaces.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }
}
