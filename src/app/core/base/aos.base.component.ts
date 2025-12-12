import { Directive, OnDestroy, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AosService } from '../../services/aos.service';
import { Subscription } from 'rxjs';

@Directive()
export abstract class AosBaseComponent implements AfterViewInit, OnDestroy {
  protected aosSubscription?: Subscription;
  protected isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected aosService: AosService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Wait for AOS to be ready
    this.aosSubscription = this.aosService.initialized$.subscribe(initialized => {
      if (initialized) {
        setTimeout(() => this.onAosReady(), 50);
      }
    });
  }

  protected onAosReady(): void {
    // Override in child if needed
    this.aosService.refreshAfterDelay(100);
  }

  protected refreshAosOnDataChange(): void {
    if (this.isBrowser) {
      this.aosService.refreshAfterDelay(150);
    }
  }

  ngOnDestroy(): void {
    this.aosSubscription?.unsubscribe();
  }

   ngOnInit(): void {
    // if (this.isBrowser) {
    //   this.aosSubscription = this.aosService.initialized$.subscribe(initialized => {
    //     if (initialized) {
    //       this.onAosReady();
    //     }
    //   });
    // }
  }

}