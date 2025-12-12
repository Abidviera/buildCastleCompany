import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface Achievement {
  icon: string;
  number: string;
  label: string;
  color: string;
  iconClass: string;
}

interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
  iconClass: string;
}
@Component({
  selector: 'app-team-showcase',
  standalone: false,
  templateUrl: './team-showcase.component.html',
  styleUrl: './team-showcase.component.scss',
})
export class TeamShowcaseComponent extends AosBaseComponent {
  activeTab: 'team' | 'expertise' = 'team';

  private aosInitialized = false;

  teamMembers: TeamMember[] = [
    {
      name: 'Expert Engineers',
      role: 'Structural & Civil Engineering',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3MzM2NzYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description:
        'Experienced civil engineers ensuring structural integrity and safety',
    },
    {
      name: 'Skilled Workers',
      role: 'Construction & Execution',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzMzNjc2MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Professional craftsmen with years of hands-on experience',
    },
    {
      name: 'Design Architects',
      role: 'Interior & Exterior Design',
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3QlMjBkZXNpZ258ZW58MXx8fHwxNzMzNjc2MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description:
        'Creative designers transforming spaces into beautiful realities',
    },
    {
      name: 'Project Managers',
      role: 'Planning & Supervision',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlcnxlbnwxfHx8fDE3MzM2NzYxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Dedicated supervisors ensuring timely and quality delivery',
    },
  ];

  achievements: Achievement[] = [
    {
      icon: 'trophy',
      iconClass: 'bi bi-trophy-fill',
      number: '10+',
      label: 'Years Experience',
      color: '#d4a574',
    },
    {
      icon: 'people-fill',
      iconClass: 'bi bi-people-fill',
      number: '200+',
      label: 'Happy Clients',
      color: '#8B7355',
    },
    {
      icon: 'hammer',
      iconClass: 'bi bi-hammer',
      number: '150+',
      label: 'Projects Done',
      color: '#A0826D',
    },
    {
      icon: 'shield-check',
      iconClass: 'bi bi-shield-check',
      number: '100%',
      label: 'Quality Assured',
      color: '#BC9A6F',
    },
  ];

  expertise: ExpertiseItem[] = [
    {
      icon: 'diploma',
      iconClass: 'bi bi-mortarboard-fill',
      title: 'Certified Professionals',
      description: 'All our engineers hold valid certifications and licenses',
    },
    {
      icon: 'clock-history',
      iconClass: 'bi bi-clock-history',
      title: 'On-Time Delivery',
      description:
        'We pride ourselves on meeting deadlines without compromising quality',
    },
    {
      icon: 'briefcase-fill',
      iconClass: 'bi bi-briefcase-fill',
      title: 'Complete Solutions',
      description:
        'From planning to handover, we handle everything under one roof',
    },
    {
      icon: 'graph-up-arrow',
      iconClass: 'bi bi-graph-up-arrow',
      title: 'Continuous Innovation',
      description:
        'We stay updated with latest construction technologies and trends',
    },
  ];


  private bootstrapIconMap: { [key: string]: string } = {
    diploma: 'bi bi-mortarboard-fill',
    'clock-history': 'bi bi-clock-history',
    'briefcase-fill': 'bi bi-briefcase-fill',
    'graph-up-arrow': 'bi bi-graph-up-arrow',
    trophy: 'bi bi-trophy-fill',
    'people-fill': 'bi bi-people-fill',
    hammer: 'bi bi-hammer',
    'shield-check': 'bi bi-shield-check',
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  setTab(tab: 'team' | 'expertise') {
    this.activeTab = tab;
    this.refreshAosOnDataChange();
  }

  scrollToContact() {
    if (!this.isBrowser) return;

    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlzaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
    img.onerror = null;
  }

  getBootstrapIconClass(iconName: string): string {
    return this.bootstrapIconMap[iconName] || 'bi bi-question-circle';
  }

  getBootstrapIconClassForAchievements(iconName: string): string {
    const baseClass =
      this.bootstrapIconMap[iconName] || 'bi bi-question-circle';
    return baseClass;
  }

  updateIcon(iconName: string, newIconClass: string): void {
    this.bootstrapIconMap[iconName] = newIconClass;
  }
}
