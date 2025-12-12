import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface Feature {
  iconClass: string;
  title: string;
  description: string;
}

interface UniqueService {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-special-features',
  standalone: false,
  templateUrl: './special-features.component.html',
  styleUrl: './special-features.component.scss',
})
export class SpecialFeaturesComponent extends AosBaseComponent {
  features: Feature[] = [
    {
      iconClass: 'smartphone-icon',
      title: '3D Virtual Tours',
      description:
        'Experience your future home before construction with realistic 3D walkthroughs and virtual reality previews',
    },
    {
      iconClass: 'camera-icon',
      title: 'Live Progress Updates',
      description:
        'Get daily photo and video updates of your construction progress directly to your phone',
    },
    {
      iconClass: 'clipboard-check-icon',
      title: 'Digital Documentation',
      description:
        'Access all project documents, drawings, and approvals anytime through our secure online portal',
    },
    {
      iconClass: 'trending-up-icon',
      title: 'Value Engineering',
      description:
        'Optimize your budget without compromising quality through smart material and design choices',
    },
    {
      iconClass: 'shield-icon',
      title: 'Quality Guarantee',
      description:
        '1-year comprehensive warranty on workmanship and construction with lifetime support',
    },
    {
      iconClass: 'clock-icon',
      title: 'Time-Bound Delivery',
      description:
        'Penalty clause for delays from our side - we value your time as much as you do',
    },
    {
      iconClass: 'leaf-icon',
      title: 'Eco-Friendly Options',
      description:
        'Sustainable materials and energy-efficient designs to reduce your carbon footprint',
    },
    {
      iconClass: 'lightbulb-icon',
      title: 'Smart Home Integration',
      description:
        'Future-ready homes with provisions for smart lighting, security, and automation systems',
    },
  ];

  uniqueServices: UniqueService[] = [
    {
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBwbGFubmluZyUyMGNhbGN1bGF0b3J8ZW58MXx8fHwxNzY0OTYxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Transparent Pricing',
      description:
        'Detailed, itemized quotes with zero hidden charges. Every rupee accounted for.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1603891345603-7163d3ee559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzY0OTYwODAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Expert Consultation',
      description:
        'Free initial site visit and consultation with our senior engineers and designers.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwd29ya3xlbnwxfHx8fDE3NjQ5NjA4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Post-Construction Support',
      description:
        "We don't disappear after handover. Lifetime support for any queries or minor fixes.",
    },
  ];

  errorImage =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  onImageError(event: Event, service: UniqueService) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.errorImage;
    imgElement.onerror = null;
  }

  onMouseEnter(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.add('hovering');
  }

  onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.remove('hovering');
  }

  onServiceHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const img = card.querySelector('.service-image') as HTMLImageElement;
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
  }

  onServiceLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const img = card.querySelector('.service-image') as HTMLImageElement;
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }
}
