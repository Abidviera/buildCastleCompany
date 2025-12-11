import { 
  Component, 
  OnInit, 
  Inject, 
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  HostListener,
  ElementRef,
  ViewChild 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-quick-quote',
  standalone: false,
  templateUrl: './quick-quote.component.html',
  styleUrl: './quick-quote.component.scss'
})
export class QuickQuoteComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('formSection') formSection!: ElementRef;
  
  formData = {
    name: '',
    phone: '',
    service: '',
    timeline: ''
  };

  services = [
    'Select a service',
    'New Construction',
    'Renovation',
    'Interior Design',
    'Exterior Design',
    'Landscaping',
    'Estimation Only',
    'Approvals & Drawings',
    'General Consultation'
  ];

  timelines = [
    'Select timeline',
    'Immediately',
    'Within 1 Month',
    '1-3 Months',
    '3-6 Months',
    'Just Planning / Exploring'
  ];

  private aosInitialized = false;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
      this.setupIntersectionObserver();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupResizeObserver();
      this.refreshAOSIfNeeded();
    }
  }

  ngOnDestroy(): void {
    this.cleanupObservers();
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      AOS.refreshHard();
    }
  }

  private initializeAOS(): void {
    if (this.aosInitialized) return;

    // Check if AOS is already loaded
    if (typeof AOS !== 'undefined') {
      this.initAOS();
    } else {
      // Dynamic import with error handling
      import('aos').then(module => {
        this.initAOS();
      }).catch(error => {
        console.warn('AOS failed to load, continuing without animations:', error);
      });
    }
  }

  private initAOS(): void {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100, // Slightly higher for better performance
      delay: 0,
      disable: this.shouldDisableAOS(),
      anchorPlacement: 'top-bottom',
      mirror: false,
      throttleDelay: 99,
      debounceDelay: 50,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
    });

    this.aosInitialized = true;
    
    // Refresh AOS after a short delay to ensure elements are measured correctly
    setTimeout(() => {
      if (this.aosInitialized) {
        AOS.refresh();
      }
    }, 100);
  }

  private shouldDisableAOS(): boolean {
    // Disable AOS on mobile if performance is a concern
    if (!isPlatformBrowser(this.platformId)) return true;
    
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return prefersReducedMotion || (isMobile && window.innerWidth < 480);
  }

  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.aosInitialized) {
            // Trigger AOS refresh when section comes into view
            AOS.refresh();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (this.formSection?.nativeElement) {
      this.intersectionObserver.observe(this.formSection.nativeElement);
    }
  }

  private setupResizeObserver(): void {
    if (!isPlatformBrowser(this.platformId) || !('ResizeObserver' in window)) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.debouncedAOSRefresh();
    });

    if (this.formSection?.nativeElement) {
      this.resizeObserver.observe(this.formSection.nativeElement);
    }
  }

  private debouncedAOSRefresh = this.debounce(() => {
    if (this.aosInitialized) {
      AOS.refresh();
    }
  }, 150);

  private debounce(func: Function, wait: number): Function {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  private refreshAOSIfNeeded(): void {
    // Refresh AOS after view is initialized to catch any dynamic elements
    if (this.aosInitialized) {
      setTimeout(() => {
        AOS.refresh();
      }, 300);
    }
  }

  private cleanupObservers(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      this.debouncedAOSRefresh();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Optional: Add any scroll-based logic here
    // This can be more performant than handleScroll if properly debounced
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    const message = `Quick Quote Request from BUILD CASTLE Website

Name: ${this.formData.name}
Phone: ${this.formData.phone}
Service: ${this.formData.service}
Timeline: ${this.formData.timeline}

Please contact me with more details and pricing.`;

    const whatsappUrl = `https://wa.me/919847088914?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.formData = {
      name: '',
      phone: '',
      service: '',
      timeline: ''
    };
  }
}