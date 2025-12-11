import { Component, Inject, PLATFORM_ID, HostListener, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  project: string;
}

@Component({
  selector: 'app-testimonials-carousel',
  standalone: false,
  templateUrl: './testimonials-carousel.component.html',
  styleUrl: './testimonials-carousel.component.scss'
})
export class TestimonialsCarouselComponent implements OnDestroy {
  testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Kallumpuram',
      rating: 5,
      text: 'BUILD CASTLE transformed our vision into reality. Their attention to detail and professional approach made our home construction journey smooth and enjoyable. Highly recommended!',
      project: 'New Construction - 2000 sq ft'
    },
    {
      name: 'Priya Menon',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Excellent service from planning to completion. The team handled all approvals efficiently and delivered our dream home on time. The interior design exceeded our expectations!',
      project: 'Complete Home Build'
    },
    {
      name: 'Suresh Nair',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Professional team with great expertise in both construction and design. Their renovation work on our old house was outstanding. Very transparent with pricing and timeline.',
      project: 'Full Home Renovation'
    },
    {
      name: 'Anjali Krishnan',
      location: 'Kallumpuram',
      rating: 5,
      text: 'The landscaping work done by BUILD CASTLE completely transformed our outdoor space. Beautiful design, quality execution, and excellent follow-up service.',
      project: 'Landscaping & Exterior'
    },
    {
      name: 'Mohammed Rasheed',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Best decision we made! From estimation to final handover, everything was perfect. Their engineers are knowledgeable and the contractors are skilled. Highly professional!',
      project: 'New Construction'
    }
  ];

  currentIndex = 0;
  private timer: any;
  private isBrowser: boolean;
  private aosInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeAOS();
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.destroyAOS();
  }

  private async initializeAOS(): Promise<void> {
    if (this.aosInitialized || !this.isBrowser) return;

    try {
      const AOS = await import('aos');
      AOS.default.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        anchorPlacement: 'top-bottom',
        mirror: false,
        throttleDelay: 99,
        debounceDelay: 50,
      });
      this.aosInitialized = true;
    } catch (error) {
      console.warn('AOS library failed to load:', error);
    }
  }

  private destroyAOS(): void {
    if (this.isBrowser && this.aosInitialized) {
      try {
        const AOS = require('aos');
        AOS.refreshHard();
      } catch (error) {
        // AOS might not be available during SSR
      }
    }
  }

  startAutoSlide(): void {
    if (!this.isBrowser) return;
    
    this.stopAutoSlide();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoSlide(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  goToSlide(index: number): void {
    this.stopAutoSlide();
    this.currentIndex = index;
    this.startAutoSlide();
  }

  getStarsArray(rating: number): any[] {
    return new Array(rating);
  }

  // Pause autoslide on hover for better UX
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.startAutoSlide();
  }

  // Pause autoslide when tab is not visible
  @HostListener('window:blur')
  onWindowBlur(): void {
    this.stopAutoSlide();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    this.startAutoSlide();
  }

  // Handle visibility change for mobile
  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.stopAutoSlide();
    } else {
      this.startAutoSlide();
    }
  }
}