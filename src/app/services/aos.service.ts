// src/app/services/aos.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import AOS from 'aos';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private initialized = false;
  private aosInstance: typeof AOS | null = null;
  private refreshQueue: Set<string> = new Set();
  private refreshTimeout: any;
  
  // Observable to track initialization status
  public initialized$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
    }
  }

  private async initializeAOS(): Promise<void> {
    if (this.initialized || !isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
      }

      // Small delay to ensure all components are mounted
      await new Promise(resolve => setTimeout(resolve, 100));

      // Initialize AOS with optimized settings
      AOS.init({
        // Animation settings
        duration: 600,           // Optimal duration for smooth animations
        easing: 'ease-out-cubic', // Smooth easing
        once: true,              // Animate only once for better performance
        
        // Trigger settings
        offset: 80,              // Start animation 80px before element enters viewport
        delay: 0,                // No delay by default (use data-aos-delay for specific elements)
        
        // Performance optimizations
        disable: false,          // Enable on all devices (we'll handle performance differently)
        throttleDelay: 99,       // Throttle scroll events
        debounceDelay: 50,       // Debounce resize events
        
        // Behavior settings
        mirror: false,           // Don't animate on scroll up (better performance)
        anchorPlacement: 'top-bottom', // Trigger when element top hits viewport bottom
        startEvent: 'DOMContentLoaded',
        
        // Advanced settings
        disableMutationObserver: false, // Keep enabled for dynamic content
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false
      });

      this.aosInstance = AOS;
      this.initialized = true;
      this.initialized$.next(true);

      // Setup intelligent refresh system
      this.setupIntelligentRefresh();

      console.log('✅ AOS initialized successfully');
    } catch (error) {
      console.error('❌ AOS initialization failed:', error);
    }
  }

  private setupIntelligentRefresh(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Refresh on window load (catches late-loading images)
    window.addEventListener('load', () => {
      this.smartRefresh('window-load');
    }, { once: true, passive: true });

    // Debounced resize handler
    let resizeTimeout: any;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.smartRefresh('resize');
      }, 150);
    }, { passive: true });

    // Refresh after route changes (for SPAs)
    // Note: You might need to integrate this with your router if needed
  }

  /**
   * Smart refresh with debouncing to prevent excessive calls
   */
  public smartRefresh(source: string = 'manual'): void {
    if (!this.initialized || !isPlatformBrowser(this.platformId)) {
      return;
    }

    // Add to queue
    this.refreshQueue.add(source);

    // Clear existing timeout
    clearTimeout(this.refreshTimeout);

    // Debounce refresh calls
    this.refreshTimeout = setTimeout(() => {
      if (this.aosInstance) {
        this.aosInstance.refresh();
        console.log(`🔄 AOS refreshed from: ${Array.from(this.refreshQueue).join(', ')}`);
        this.refreshQueue.clear();
      }
    }, 100);
  }

  /**
   * Force immediate refresh (use sparingly)
   */
  public forceRefresh(): void {
    if (this.initialized && this.aosInstance && isPlatformBrowser(this.platformId)) {
      this.aosInstance.refresh();
    }
  }

  /**
   * Refresh after a delay (useful for after DOM updates)
   */
  public refreshAfterDelay(delay: number = 100): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => {
      this.smartRefresh('delayed');
    }, delay);
  }

  /**
   * Check if AOS is initialized
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Cleanup (call this in app component ngOnDestroy if needed)
   */
  public cleanup(): void {
    if (this.aosInstance && isPlatformBrowser(this.platformId)) {
      this.aosInstance.refreshHard();
      clearTimeout(this.refreshTimeout);
    }
  }

  /**
   * Get optimal animation delay for staggered animations
   */
  public getStaggerDelay(index: number, baseDelay: number = 100): number {
    return index * baseDelay;
  }

  /**
   * Apply animations to dynamically added elements
   */
  public applyToElement(element: HTMLElement): void {
    if (!this.initialized || !isPlatformBrowser(this.platformId)) return;
    
    // Add AOS attributes if they don't exist
    if (!element.hasAttribute('data-aos')) {
      element.setAttribute('data-aos', 'fade-up');
    }
    
    // Trigger refresh
    this.refreshAfterDelay(50);
  }
}