import { Component, Inject, PLATFORM_ID, OnDestroy, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-why-choose-us',
  standalone: false,
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent {
imageSrc = 'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwd29ya3xlbnwxfHx8fDE3NjQ5NjA4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
  imageError = false;
  
  private scrollSubscription?: Subscription;
  private aosInitialized = false;

  readonly ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
      this.setupScrollListener();
    }
  }

  private initializeAOS(): void {
    if (this.aosInitialized) return;
    
    import('aos').then(aos => {
      aos.default.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        disable: window.innerWidth < 768, // Disable on mobile for performance
        anchorPlacement: 'top-bottom',
        mirror: false,
        throttleDelay: 99,
        debounceDelay: 50,
        startEvent: 'DOMContentLoaded',
        disableMutationObserver: false,
      });
      this.aosInitialized = true;
      
      // Refresh AOS after image loads
      setTimeout(() => {
        if (aos.default) {
          aos.default.refresh();
        }
      }, 100);
    }).catch(error => {
      console.warn('AOS failed to load:', error);
    });
  }

  private setupScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(100)) // Optimize scroll performance
      .subscribe(() => {
        this.handleScroll();
      });
  }

  private handleScroll(): void {
    // Your existing scroll logic here
    const scrollPosition = window.pageYOffset || 
                          document.documentElement.scrollTop || 
                          document.body.scrollTop || 0;

    // Add your scroll-based visibility logic here
    // Example: this.servicesVisible = scrollPosition > 100;
  }

  onImageError(): void {
    this.imageError = true;
    // Refresh AOS after image error state changes
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      import('aos').then(aos => {
        setTimeout(() => aos.default.refresh(), 50);
      });
    }
  }

  
}
