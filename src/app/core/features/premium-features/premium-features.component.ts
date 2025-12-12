import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';
interface PremiumFeature {
  icon: string;
  title: string;
  description: string;
  color: string;
  image: string;
  features: string[];
}

interface LiveStat {
  icon: string;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

interface InnovationHighlight {
  icon: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-premium-features',
  standalone: false,
  templateUrl: './premium-features.component.html',
  styleUrl: './premium-features.component.scss',
  providers: [SafeHtmlPipe],
})
export class PremiumFeaturesComponent extends AosBaseComponent {
  selectedFeature = 0;
  animatedStats: number[] = [];
  private autoRotateInterval: any;
  private statsAnimationInterval: any;

  icons = {
    sparkles: 'bi bi-stars',
    lightbulb: 'bi bi-lightbulb',
    cpu: 'bi bi-cpu',
    camera: 'bi bi-camera',
    shield: 'bi bi-shield-check',
    ruler: 'bi bi-nut',
    barChart: 'bi bi-bar-chart',
    trendingUp: 'bi bi-graph-up-arrow',
    clock: 'bi bi-clock',
    award: 'bi bi-award',
    checkCircle: 'bi bi-check-circle',
    zap: 'bi bi-lightning-charge',
    layers: 'bi bi-layers',
    target: 'bi bi-bullseye',
    star: 'bi bi-star',
    house: 'bi bi-house',
    building: 'bi bi-building',
    tools: 'bi bi-tools',
    hammer: 'bi bi-hammer',
    truck: 'bi bi-truck',
    palette: 'bi bi-palette',
    thermometer: 'bi bi-thermometer-sun',
    wifi: 'bi bi-wifi',
    shieldLock: 'bi bi-shield-lock',
    currencyDollar: 'bi bi-currency-dollar',
    graphUp: 'bi bi-graph-up',
    calendarCheck: 'bi bi-calendar-check',
    people: 'bi bi-people',
    gem: 'bi bi-gem',
    trophy: 'bi bi-trophy',
    buildingCheck: 'bi bi-building-check',
  };

  premiumFeatures: PremiumFeature[] = [
    {
      icon: this.icons.lightbulb,
      title: '3D Design Visualization',
      description: 'See your project in stunning 3D before construction begins',
      color: '#d4a574',
      image: '3drendering1.webp',
      features: [
        'Photorealistic renders',
        'Virtual walkthroughs',
        'Real-time modifications',
      ],
    },
    {
      icon: this.icons.cpu,
      title: 'Smart Project Management',
      description: 'AI-powered scheduling and resource optimization',
      color: '#BC9A6F',
      image: 'projectmanagemnt.webp',
      features: ['Progress tracking', 'Budget monitoring', 'Timeline updates'],
    },
    {
      icon: this.icons.camera,
      title: 'Live Construction Updates',
      description: 'Monitor your project 24/7 with live photo updates',
      color: '#8B7355',
      image: 'liveupdation.webp',
      features: [
        'Daily photo updates',
        'Milestone notifications',
        'Video reports',
      ],
    },
    {
      icon: this.icons.shield,
      title: '10-Year Warranty',
      description: 'Comprehensive structural warranty for peace of mind',
      color: '#A0826D',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTczMzY3NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: [
        'Structural coverage',
        'Quality guarantee',
        'Free inspections',
      ],
    },
    {
      icon: this.icons.ruler,
      title: 'Premium Material Sourcing',
      description: 'Only the finest materials from certified suppliers',
      color: '#9C8357',
      image: 'meterail.webp',
      features: [
        'Quality certified',
        'Eco-friendly options',
        'Competitive pricing',
      ],
    },
    {
      icon: this.icons.barChart,
      title: 'Transparent Cost Tracking',
      description: 'Real-time budget tracking with detailed breakdowns',
      color: '#8B6F47',
      image: 'costtracking.webp',
      features: ['No hidden costs', 'Itemized billing', 'Payment flexibility'],
    },
  ];

  liveStats: LiveStat[] = [
    {
      icon: this.icons.trendingUp,
      label: 'Project Success Rate',
      value: 98,
      suffix: '%',
      color: '#d4a574',
    },
    {
      icon: this.icons.clock,
      label: 'Average Completion',
      value: 6,
      suffix: ' Months',
      color: '#BC9A6F',
    },
    {
      icon: this.icons.award,
      label: 'Customer Satisfaction',
      value: 4.9,
      suffix: '/5.0',
      color: '#8B7355',
    },
    {
      icon: this.icons.checkCircle,
      label: 'On-Time Delivery',
      value: 95,
      suffix: '%',
      color: '#A0826D',
    },
  ];

  innovationHighlights: InnovationHighlight[] = [
    {
      icon: this.icons.zap,
      title: 'Green Building',
      description: 'Sustainable & eco-friendly construction practices',
    },
    {
      icon: this.icons.layers,
      title: 'Modular Design',
      description: 'Flexible spaces that adapt to your needs',
    },
    {
      icon: this.icons.target,
      title: 'Smart Home Ready',
      description: 'Pre-wired for modern automation systems',
    },
    {
      icon: this.icons.star,
      title: 'Energy Efficient',
      description: 'Optimized for reduced energy consumption',
    },
  ];

  ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
  imageErrors: { [key: string]: boolean } = {};

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    aosService: AosService,
    private sanitizer: DomSanitizer
  ) {
    super(platformId, aosService);
  }

  protected override onAosReady(): void {
    super.onAosReady();
    if (this.isBrowser) {
      this.animatedStats = this.liveStats.map(() => 0);
      this.animateStats();
      this.startAutoRotate();
    }
  }

  override ngOnDestroy(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
    if (this.statsAnimationInterval) {
      clearInterval(this.statsAnimationInterval);
    }
    super.ngOnDestroy();
  }

  animateStats(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;

    this.statsAnimationInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      this.animatedStats = this.liveStats.map((stat) => {
        return parseFloat((stat.value * progress).toFixed(1));
      });

      if (currentStep >= steps) {
        clearInterval(this.statsAnimationInterval);
      }
    }, interval);
  }

  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      this.selectedFeature =
        (this.selectedFeature + 1) % this.premiumFeatures.length;
    }, 4000);
  }

  selectFeature(index: number): void {
    this.selectedFeature = index;
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
    this.startAutoRotate();
  }

  scrollToContact(): void {
    if (this.isBrowser) {
      const element = document.getElementById('contact');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }

  handleImageError(imageUrl: string): void {
    this.imageErrors[imageUrl] = true;
  }

  getImageUrl(imageUrl: string): SafeUrl | string {
    if (this.imageErrors[imageUrl]) {
      return this.sanitizer.bypassSecurityTrustUrl(this.ERROR_IMG_SRC);
    }
    return imageUrl;
  }

  getProgressWidth(statIndex: number): string {
    const stat = this.liveStats[statIndex];
    const animatedValue = this.animatedStats[statIndex];
    return `${(animatedValue / stat.value) * 100}%`;
  }

  getParticleStyle(index: number): any {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${5 + Math.random() * 10}s`,
    };
  }
}
