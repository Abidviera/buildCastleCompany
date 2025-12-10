import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
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


   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
   ngOnInit(): void {
   
   if (isPlatformBrowser(this.platformId)) {
      import('aos').then(aos => {
        aos.default.init({
          duration: 600,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
          delay: 0,
          disable: false,
          anchorPlacement: 'top-bottom',
          mirror: false,
          throttleDelay: 99,
          debounceDelay: 50,
        });
      });
    }
    // this.handleScroll();
  }

  ngOnDestroy(): void {

  
  }

  
}
