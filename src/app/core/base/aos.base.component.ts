// src/app/core/base/aos-base.component.ts
import { Directive, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AosService } from '../../services/aos.service';
import { Subscription } from 'rxjs';

@Directive()
export abstract class AosBaseComponent implements OnInit, OnDestroy {
  protected aosSubscription?: Subscription;
  protected isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected aosService: AosService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.aosSubscription = this.aosService.initialized$.subscribe(initialized => {
        if (initialized) {
          this.onAosReady();
        }
      });
    }
  }

  /**
   * Override this method in child components if needed
   */
  protected onAosReady(): void {
    // Refresh AOS after component view is initialized
    this.aosService.refreshAfterDelay(150);
  }

  /**
   * Helper method to refresh AOS when component data changes
   */
  protected refreshAosOnDataChange(): void {
    if (this.isBrowser) {
      this.aosService.refreshAfterDelay(100);
    }
  }

  ngOnDestroy(): void {
    this.aosSubscription?.unsubscribe();
  }
}