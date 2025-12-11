import { 
  Component, 
  OnInit, 
  Inject, 
  PLATFORM_ID,
  HostListener,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type AOS from 'aos';

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
export class ProcessComponent {
  private aosInitialized = false;
  
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAOS();
    }
  }

  private async initAOS(): Promise<void> {
    try {
      const aos = await import('aos');
      if (aos && !this.aosInitialized) {
        aos.default.init({
          duration: 800, // Slightly longer for smoothness
          easing: 'ease-out-cubic',
          once: true, // Animation happens only once
          offset: 100, // Trigger animation earlier
          delay: 150, // Small delay for staggered effect
          disable: this.isMobile(), // Disable on mobile if needed
          anchorPlacement: 'top-bottom',
          mirror: false,
          throttleDelay: 99,
          debounceDelay: 50,
          startEvent: 'DOMContentLoaded'
        });
        this.aosInitialized = true;
      }
    } catch (error) {
      console.warn('AOS failed to load:', error);
    }
  }

  private isMobile(): boolean {
    return isPlatformBrowser(this.platformId) && 
           window.innerWidth <= 768;
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

  // Optional: Refresh AOS on window resize for responsive behavior
  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      import('aos').then(aos => {
        aos.default.refresh();
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      import('aos').then(aos => {
        aos.default.refreshHard(); // Clean up AOS
      });
    }
  }
}
