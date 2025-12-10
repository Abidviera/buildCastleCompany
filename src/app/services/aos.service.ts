import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

export type AOSConfig = Partial<AOS.AosOptions>;

@Injectable({
  providedIn: 'root',
})
export class AosService {
  private isBrowser: boolean;
  private initialized = false;
  private mobileBreakpoint = 768;
  private defaultConfig: AOS.AosOptions;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.defaultConfig = {
      offset: 100,
      delay: 0,
      duration: 600,
      easing: 'ease-out-cubic',

      once: true,
      mirror: false,

      anchorPlacement: 'top-bottom',

      throttleDelay: 99,
      debounceDelay: 50,

      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
    };
  }

  init(config?: AOSConfig): void {
    if (!this.isBrowser || this.initialized) return;

    const finalConfig: AOS.AosOptions = {
      ...this.defaultConfig,
      ...config,

      disable:
        config?.disable !== undefined ? config.disable : this.getDisableValue(),
    };

    AOS.init(finalConfig);
    this.initialized = true;

    this.addPerformanceListeners();
  }

  private getDisableValue(): boolean | 'phone' | 'tablet' | 'mobile' {
    if (!this.isBrowser) return false;

    const isMobile = window.innerWidth < this.mobileBreakpoint;

    return isMobile ? 'mobile' : false;
  }

  private addPerformanceListeners(): void {
    if (!this.isBrowser) return;

    this.addReducedMotionListener();

    this.addResponsiveResizeListener();
  }

  private addReducedMotionListener(): void {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleReducedMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        AOS.refresh();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleReducedMotion);
    } else {
      (mediaQuery as any).addListener(handleReducedMotion);
    }

    handleReducedMotion(mediaQuery);
  }

  private addResponsiveResizeListener(): void {
    let resizeTimeout: any;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
  }

  updateConfig(config: AOSConfig): void {
    if (!this.isBrowser || !this.initialized) return;

    const elements = document.querySelectorAll('[data-aos]');
    const elementStates = Array.from(elements).map((el) => ({
      element: el,
      hasAnimated: el.classList.contains('aos-animate'),
    }));

    elements.forEach((el) => {
      el.classList.remove('aos-init', 'aos-animate');
    });

    const newConfig: AOS.AosOptions = {
      ...this.defaultConfig,
      ...config,
      disable:
        config.disable !== undefined ? config.disable : this.getDisableValue(),
    };

    AOS.init(newConfig);

    elementStates.forEach((state) => {
      if (state.hasAnimated) {
        state.element.classList.add('aos-animate');
      }
    });
  }

  refresh(): void {
    if (this.isBrowser && this.initialized) {
      AOS.refresh();
    }
  }

  isElementInViewport(element: HTMLElement, offset = 0): boolean {
    if (!this.isBrowser) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top <= windowHeight - offset && rect.bottom >= offset;
  }

  getOptimizedDelay(
    baseDelay: number,
    index: number,
    screenWidth?: number
  ): number {
    if (!this.isBrowser) return baseDelay;

    const width = screenWidth || window.innerWidth;
    const isMobile = width < this.mobileBreakpoint;

    if (isMobile) {
      const maxDelay = Math.min(baseDelay + index * 50, 300);
      return maxDelay;
    }

    return baseDelay + index * 100;
  }

  getOptimizedDuration(elementType: string, screenWidth?: number): number {
    if (!this.isBrowser) return 600;

    const width = screenWidth || window.innerWidth;
    const isMobile = width < this.mobileBreakpoint;

    const baseDuration = isMobile ? 400 : 600;

    switch (elementType) {
      case 'text':
      case 'title':
        return baseDuration - 100;
      case 'card':
      case 'image':
        return baseDuration;
      case 'complex':
        return isMobile ? 300 : 500;
      default:
        return baseDuration;
    }
  }

  getOptimizedAnimationType(
    elementType: string,
    index: number,
    screenWidth?: number
  ): string {
    const width = screenWidth || (this.isBrowser ? window.innerWidth : 1024);

    if (width < 480) {
      return 'fade';
    } else if (width < 768) {
      return 'fade-up';
    } else {
      const animations = ['fade-up', 'fade-down', 'zoom-in'];
      return animations[index % animations.length];
    }
  }

  isAOSAvailable(): boolean {
    return this.isBrowser && this.initialized && typeof AOS !== 'undefined';
  }

  reinitForDynamicContent(): void {
    if (this.isBrowser && this.initialized) {
      const newElements = document.querySelectorAll(
        '[data-aos]:not(.aos-init)'
      );
      newElements.forEach((el) => {
        el.classList.add('aos-init');
      });

      this.refresh();
    }
  }
}
