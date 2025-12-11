import { 
  Component, 
  OnInit, 
  Inject, 
  PLATFORM_ID,
  OnDestroy 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface FormData {
  projectType: string;
  area: string;
  quality: string;
  floors: string;
}

@Component({
  selector: 'app-cost-calculator',
  standalone: false,
  templateUrl: './cost-calculator.component.html',
  styleUrl: './cost-calculator.component.scss'
})
export class CostCalculatorComponent {
   formData: FormData = {
    projectType: '',
    area: '',
    quality: '',
    floors: '1'
  };

  estimate: number | null = null;
  showResult = false;
  
  // Included items array for animation
  includedItems = [
    'Complete construction/renovation work',
    'Quality materials as per selected grade',
    'Labor and contractor management',
    'Basic electrical and plumbing work',
    'Painting and finishing'
  ];

  // SVG Icons
  calculatorIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M8 7h8M8 11h8M8 15h4M12 15v4M16 15v4"></path>
    </svg>
  `;

  dollarIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  `;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.initAOS();
  }

  ngOnDestroy(): void {
    this.destroyAOS();
  }

  private async initAOS(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Lazy load AOS only on browser
        const aos = await import('aos');
        
        // Initialize AOS with optimized settings
        aos.default.init({
          // Basic settings
          offset: 60, // Start animation when element is 60px from viewport
          delay: 0, // Default delay
          duration: 500, // Shorter duration for snappier feel
          easing: 'ease-out-cubic', // Smooth easing function
          once: true, // Animate only once
          
          // Advanced optimizations
          disable: this.isMobileDevice(), // Disable on mobile if needed
          startEvent: 'DOMContentLoaded', // Start after DOM is ready
          throttleDelay: 99, // Throttle scroll event
          debounceDelay: 50, // Debounce resize event
          
          // Performance settings
          mirror: false, // Don't animate on scroll up (performance)
          
          // Anchor placement
          anchorPlacement: 'top-bottom',
        });
        
        console.log('AOS initialized successfully');
      } catch (error) {
        console.warn('AOS failed to load:', error);
      }
    }
  }

  private destroyAOS(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Clean up AOS if needed
      import('aos').then(aos => {
        aos.default.refreshHard(); // Force reinitialization if needed
      }).catch(() => {
        // Silently fail if AOS isn't available
      });
    }
  }

  private isMobileDevice(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return window.innerWidth <= 768;
  }

  calculateEstimate(event: Event): void {
    event.preventDefault();
    
    const area = parseFloat(this.formData.area);
    if (!area || !this.formData.projectType || !this.formData.quality) return;

    // Base rates per sq ft
    const baseRates: { [key: string]: number } = {
      'new-construction-standard': 1800,
      'new-construction-premium': 2500,
      'new-construction-luxury': 3500,
      'renovation-basic': 800,
      'renovation-complete': 1500,
      'renovation-luxury': 2200,
      'interior-basic': 400,
      'interior-premium': 800,
      'interior-luxury': 1400
    };

    const key = `${this.formData.projectType}-${this.formData.quality}`;
    const ratePerSqFt = baseRates[key] || 2000;
    
    const floorMultiplier = parseFloat(this.formData.floors);
    const totalEstimate = area * ratePerSqFt * floorMultiplier;

    this.estimate = totalEstimate;
    this.showResult = true;
    
    // Trigger AOS refresh after result is shown
    this.refreshAOS();
  }

  private refreshAOS(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        import('aos').then(aos => {
          aos.default.refresh();
        }).catch(() => {
          // Silently fail if AOS isn't available
        });
      }, 100); // Small delay to ensure DOM is updated
    }
  }

  handleChange(field: keyof FormData, value: string): void {
    this.formData = {
      ...this.formData,
      [field]: value
    };
    this.showResult = false;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  getValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement).value;
  }
}
