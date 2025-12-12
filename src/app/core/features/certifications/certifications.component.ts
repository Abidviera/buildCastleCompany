import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-certifications',
  standalone: false,
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent extends AosBaseComponent {
  certifications = [
    {
      icon: 'award',
      title: 'Licensed Engineers',
      description:
        'All our engineers are professionally qualified and licensed',
    },
    {
      icon: 'file-check',
      title: 'Approved Contractors',
      description: 'Registered and approved by local authorities',
    },
    {
      icon: 'shield',
      title: 'Quality Certified',
      description: 'ISO standards followed in all our projects',
    },
    {
      icon: 'users',
      title: 'Trained Workforce',
      description: 'Skilled workers with safety certifications',
    },
  ];

  achievements = [
    {
      icon: 'trending-up',
      stat: '150+',
      label: 'Successfully Completed Projects',
      description: 'Residential, commercial and renovation projects delivered',
    },
    {
      icon: 'check-circle',
      stat: '98%',
      label: 'Client Satisfaction Rate',
      description: 'Based on post-project surveys and testimonials',
    },
    {
      icon: 'award',
      stat: '10+',
      label: 'Years of Excellence',
      description: 'Serving the community with dedication',
    },
    {
      icon: 'shield',
      stat: '100%',
      label: 'Compliance Record',
      description: 'Perfect approval and regulatory compliance',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  getIconPath(iconName: string): string {
    const iconPaths: { [key: string]: string } = {
      award:
        'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z',
      'file-check':
        'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      shield:
        'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
      users:
        'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0z',
      'trending-up':
        'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
      'check-circle':
        'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    };

    return iconPaths[iconName] || iconPaths['award'];
  }
}
