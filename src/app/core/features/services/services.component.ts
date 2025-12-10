import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';import { AosService } from '../../../services/aos.service';

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
export class ServicesComponent {
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aosService: AosService
  ) {}

  ngOnInit(): void {
    // AOS is already initialized globally
    // Just refresh to ensure new content is detected
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.aosService.refresh();
      }, 300);
    }
  }

  getAnimationDelay(index: number): number {
    return this.aosService.getOptimizedDelay(100, index);
  }

  getAnimationType(index: number): string {
    if (!isPlatformBrowser(this.platformId)) return 'fade-up';
    
    const width = window.innerWidth;
    
    if (width < 768) {
      return 'fade-up';
    }
    
    const animations = ['fade-up', 'zoom-in'];
    return animations[index % animations.length];
  }
}
