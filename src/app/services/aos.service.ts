import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private initialized = false;
  private isInitializing = false;
  public initialized$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  /**
   * Initialize AOS - Call this from AppComponent after view init
   */
  public async initialize(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.initialized || this.isInitializing) {
      return;
    }

    this.isInitializing = true;

    try {
      // Import AOS dynamically only in browser
      const AOS = await import('aos');
      
      // Run outside Angular zone for better performance
      this.ngZone.runOutsideAngular(() => {
        AOS.default.init({
          duration: 600,
          easing: 'ease-out-cubic',
          once: true,
          offset: 80,
          delay: 0,
          disable: false,
          throttleDelay: 99,
          debounceDelay: 50,
          mirror: false,
          anchorPlacement: 'top-bottom',
          disableMutationObserver: false
        });

        this.initialized = true;
        this.isInitializing = false;
        
        // Notify components that AOS is ready
        this.ngZone.run(() => {
          this.initialized$.next(true);
        });

        console.log('✅ AOS initialized');
      });
    } catch (error) {
      console.error('❌ AOS initialization failed:', error);
      this.isInitializing = false;
    }
  }

  /**
   * Refresh AOS
   */
  public refresh(): void {
    if (!this.initialized || !isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(async () => {
      const AOS = await import('aos');
      AOS.default.refresh();
    });
  }

  /**
   * Refresh after delay
   */
  public refreshAfterDelay(delay: number = 100): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => this.refresh(), delay);
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}