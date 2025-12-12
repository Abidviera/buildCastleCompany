import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface ProcessStep {
  icon: string;
  number: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-process',
  standalone: false,
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent extends AosBaseComponent {
  steps: ProcessStep[] = [
    {
      icon: 'lightbulb',
      number: '01',
      title: 'Consultation & Planning',
      description:
        'We meet to understand your vision, requirements, and budget. Our team conducts site analysis and provides expert recommendations.',
    },
    {
      icon: 'pen-tool',
      number: '02',
      title: 'Design & Approvals',
      description:
        'Our designers create detailed plans and 3D visualizations. We handle all approval processes with Panchayath and Municipality.',
    },
    {
      icon: 'hammer',
      number: '03',
      title: 'Construction',
      description:
        'Our skilled team begins construction with quality materials and expert supervision. Regular updates keep you informed throughout.',
    },
    {
      icon: 'check-circle',
      number: '04',
      title: 'Completion & Handover',
      description:
        'Final inspections ensure everything meets our high standards. We hand over your dream home ready to move in.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  getBootstrapIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      lightbulb: 'bi bi-lightbulb',
      'pen-tool': 'bi bi-pen',
      hammer: 'bi bi-hammer',
      'check-circle': 'bi bi-check-circle',
    };
    return iconMap[iconName] || 'bi bi-circle';
  }
}
