import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

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
  styleUrl: './testimonials-carousel.component.scss',
})
export class TestimonialsCarouselComponent extends AosBaseComponent {
  testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Kallumpuram',
      rating: 5,
      text: 'BUILD CASTLE transformed our vision into reality. Their attention to detail and professional approach made our home construction journey smooth and enjoyable. Highly recommended!',
      project: 'New Construction - 2000 sq ft',
    },
    {
      name: 'Priya Menon',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Excellent service from planning to completion. The team handled all approvals efficiently and delivered our dream home on time. The interior design exceeded our expectations!',
      project: 'Complete Home Build',
    },
    {
      name: 'Suresh Nair',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Professional team with great expertise in both construction and design. Their renovation work on our old house was outstanding. Very transparent with pricing and timeline.',
      project: 'Full Home Renovation',
    },
    {
      name: 'Anjali Krishnan',
      location: 'Kallumpuram',
      rating: 5,
      text: 'The landscaping work done by BUILD CASTLE completely transformed our outdoor space. Beautiful design, quality execution, and excellent follow-up service.',
      project: 'Landscaping & Exterior',
    },
    {
      name: 'Mohammed Rasheed',
      location: 'Kallumpuram',
      rating: 5,
      text: 'Best decision we made! From estimation to final handover, everything was perfect. Their engineers are knowledgeable and the contractors are skilled. Highly professional!',
      project: 'New Construction',
    },
  ];

  currentIndex = 0;
  private timer: any;
  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  protected override onAosReady(): void {
    super.onAosReady();
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  override ngOnDestroy(): void {
    this.stopAutoSlide();
    super.ngOnDestroy();
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

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.startAutoSlide();
  }

  @HostListener('window:blur')
  onWindowBlur(): void {
    this.stopAutoSlide();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    this.startAutoSlide();
  }
}
