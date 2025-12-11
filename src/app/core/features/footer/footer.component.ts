import { Component, HostListener, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  email = '';
  showScrollTop = false;
  currentYear = new Date().getFullYear();
  private aosInitialized = false;

  services = [
    'Planning & Supervision',
    'Cost Estimation',
    'Approval Drawings',
    'Interior Design',
    'Exterior Design',
    'Renovation Work',
    'Landscaping'
  ];

  quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.updateScrollTopVisibility();
    
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
      this.observeFooterElements();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      // Clean up AOS event listeners
      window.removeEventListener('load', this.refreshAOS);
      window.removeEventListener('resize', this.refreshAOS);
    }
  }

  private initializeAOS(): void {
    // Lazy load AOS with optimized settings
    import('aos').then(aos => {
      aos.default.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true, // Animation happens only once
        offset: 100, // Slightly higher offset for better UX
        delay: 50, // Small delay for staggered animations
        disable: 'mobile', // Disable on mobile for better performance
        startEvent: 'DOMContentLoaded', // Start after DOM is ready
        throttleDelay: 99, // Throttle scroll calculations
        debounceDelay: 50, // Debounce resize events
        mirror: false, // Don't animate on scroll up for performance
      });
      this.aosInitialized = true;
      
      // Refresh AOS after load
      setTimeout(() => {
        aos.default.refresh();
      }, 300);
    }).catch(err => {
      console.warn('AOS failed to load:', err);
    });
  }

  private refreshAOS = (): void => {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      import('aos').then(aos => {
        aos.default.refreshHard();
      });
    }
  }

  private observeFooterElements(): void {
    // Use Intersection Observer for scroll animations as fallback
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      // Observe footer sections
      setTimeout(() => {
        const footerSections = document.querySelectorAll('.footer-container > div');
        footerSections.forEach(section => observer.observe(section));
      }, 100);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollTopVisibility();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    // Throttle AOS refresh on resize
    if (this.aosInitialized) {
      clearTimeout((window as any).aosRefreshTimeout);
      (window as any).aosRefreshTimeout = setTimeout(() => {
        this.refreshAOS();
      }, 150);
    }
  }

  private updateScrollTopVisibility(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.showScrollTop = scrollPosition > 300; // Increased threshold for better UX
    }
  }

  scrollToSection(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  handleNewsletterSubmit(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      alert(`Thank you for subscribing! We'll send updates to ${this.email}`);
    }
    this.email = '';
  }
}