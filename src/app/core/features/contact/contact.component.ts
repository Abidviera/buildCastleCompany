import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private aosInstance: any;
  private scrollTimeout: any;
  private resizeDebounceTimeout: any;
  
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  services = [
    'Planning & Contracting',
    'Estimation',
    'Approvals & Drawings',
    'Interior Design',
    'Exterior Design',
    'Renovation',
    'Landscaping',
    'General Inquiry'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAOS();
      this.handleScroll();
      
      // Reinitialize AOS on window resize with debounce
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private initAOS(): void {
    import('aos').then(AOS => {
      this.aosInstance = AOS.default;
      this.aosInstance.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100,
        disable: false,
        anchorPlacement: 'top-bottom',
        mirror: false,
        throttleDelay: 99,
        debounceDelay: 50,
        startEvent: 'DOMContentLoaded'
      });
      
      // Refresh AOS after initialization
      setTimeout(() => {
        if (this.aosInstance) {
          this.aosInstance.refresh();
        }
      }, 100);
    }).catch(error => {
      console.error('AOS initialization failed:', error);
    });
  }

  private handleScroll(): void {
    window.addEventListener('scroll', () => {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Refresh AOS on scroll for better detection
        if (this.aosInstance && scrollPosition % 300 < 50) {
          this.aosInstance.refresh();
        }
      }, 100);
    }, { passive: true });
  }

  private handleResize(): void {
    clearTimeout(this.resizeDebounceTimeout);
    this.resizeDebounceTimeout = setTimeout(() => {
      if (this.aosInstance) {
        this.aosInstance.refresh();
      }
    }, 150);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    // Add animation feedback
    const button = event.target as HTMLElement;
    const submitButton = button.closest('button') || button;
    const originalHTML = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.classList.add('sending');
    
    const message = `Hello BUILD CASTLE!\n\nName: ${this.formData.name}\nEmail: ${this.formData.email}\nPhone: ${this.formData.phone}\nService Interested: ${this.formData.service}\nMessage: ${this.formData.message}`;
    
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/919847088914?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset button state
      submitButton.innerHTML = originalHTML;
      submitButton.classList.remove('sending');
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
    }, 600);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize.bind(this));
      clearTimeout(this.scrollTimeout);
      clearTimeout(this.resizeDebounceTimeout);
      
      if (this.aosInstance) {
        this.aosInstance.destroy();
      }
    }
  }
}