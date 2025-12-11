import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Service {
  icon: string; 
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  
  services: Service[] = [
    {
      icon: 'bi-clipboard-check',
      title: 'Planning, Contracting & Supervision',
      description: 'Comprehensive project management from initial planning through construction supervision, ensuring quality at every stage.'
    },
    {
      icon: 'bi-calculator',
      title: 'Estimation',
      description: 'Detailed and accurate cost estimation services to help you plan your budget effectively and avoid surprises.'
    },
    {
      icon: 'bi-file-earmark-check',
      title: 'Approval & Completion Drawings',
      description: 'Professional architectural drawings for all approvals, ensuring compliance with regulations.'
    },
    {
      icon: 'bi-palette',
      title: 'Interior & Exterior Designing',
      description: 'Creative and functional design solutions blending aesthetics with practicality.'
    },
    {
      icon: 'bi-wrench-adjustable',
      title: 'Renovation Work',
      description: 'Expert renovation services to modernize your spaces with minimal disruption.'
    },
    {
      icon: 'bi-flower3',
      title: 'Landscaping',
      description: 'Beautiful landscape design and implementation for perfect outdoor spaces.'
    }
  ];

  private isBrowser: boolean;
  private aosInstance: any;
  private resizeListener: any;
  private loadListener: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      await this.initializeAOS();
    }
  }

  private async initializeAOS(): Promise<void> {
    try {
      const AOS = await import('aos');
      this.aosInstance = AOS.default;
      
      this.aosInstance.init({
        duration: 600,
        easing: 'ease-out-quint',
        once: false,
        offset: 50,
        delay: 0,
        disable: 'mobile',
        anchorPlacement: 'top-bottom',
        mirror: true,
        throttleDelay: 99,
        debounceDelay: 50,
        disableMutationObserver: false,
        startEvent: 'DOMContentLoaded'
      });

      // Add event listeners safely
      this.addEventListeners();
      
    } catch (error) {
      console.error('AOS loading failed:', error);
    }
  }

  private addEventListeners(): void {
    if (this.isBrowser) {
      this.resizeListener = this.renderer.listen('window', 'resize', () => {
        this.refreshAOS();
      });
      
      this.loadListener = this.renderer.listen('window', 'load', () => {
        this.refreshAOS();
      });
    }
  }

  private removeEventListeners(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
    if (this.loadListener) {
      this.loadListener();
    }
  }

  private refreshAOS(): void {
    if (this.aosInstance && this.isBrowser) {
      setTimeout(() => {
        this.aosInstance.refresh();
      }, 100);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.animateCardsOnScroll();
    }
  }

  private animateCardsOnScroll(): void {
    const cards = this.el.nativeElement.querySelectorAll('.service-card');
    cards.forEach((card: HTMLElement, index: number) => {
      const rect = card.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      
      if (isVisible) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
      }
    });
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    
    if (this.aosInstance && this.isBrowser) {
      try {
        this.aosInstance.refreshHard();
      } catch (error) {
        console.warn('Error cleaning up AOS:', error);
      }
    }
  }
}