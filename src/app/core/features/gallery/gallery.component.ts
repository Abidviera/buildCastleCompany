import { Component, Inject, PLATFORM_ID, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
  error?: boolean;
}

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5MTU4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Luxury Interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1657758481156-fbed1d83e694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NjA4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Modern Kitchen'
    },
    {
      src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NDkxMDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Living Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1639751907353-3629fc00d2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0OTMxODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Bedroom Design'
    },
    {
      src: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ4NzQ5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Bathroom Design'
    },
    {
      src: 'https://images.unsplash.com/photo-1595387426256-cc153122a6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY0OTU0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Landscape Design'
    }
  ];

  // Make this public so it can be accessed in the template
  errorImageSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

  // Scroll visibility states
  servicesVisible = false;
  qualityVisible = false;

  // For AOS initialization check
  private aosInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.initAOS();
    // Call scroll check on initialization
    this.onWindowScroll();
  }

  private initAOS(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    import('aos').then(aos => {
      aos.default.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        disable: false,
        anchorPlacement: 'top-bottom',
        mirror: false,
        throttleDelay: 99,
        debounceDelay: 50,
        disableMutationObserver: false,
        startEvent: 'DOMContentLoaded'
      });
      this.aosInitialized = true;
      console.log('AOS initialized successfully');
    }).catch(error => {
      console.warn('AOS failed to load:', error);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition > 100) {
      this.servicesVisible = true;
    }
    if (scrollPosition > 500) {
      this.qualityVisible = true;
    }

    // Refresh AOS on scroll for better detection
    this.refreshAOS();
  }

  private refreshAOS(): void {
    if (!this.aosInitialized || !isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => {
      const AOS = (window as any).AOS;
      if (AOS && typeof AOS.refresh === 'function') {
        AOS.refresh();
      }
    }, 50);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onImageError(image: GalleryImage): void {
    image.error = true;
  }

  getImageAlt(image: GalleryImage): string {
    return image.error ? `Error loading: ${image.alt}` : image.alt;
  }

  openImage(image: GalleryImage): void {
    if (!image.error) {
      console.log('Opening image:', image.src);
      // You can implement your modal/lightbox logic here
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.refreshAOSOnResize();
  }

  private refreshAOSOnResize(): void {
    if (this.aosInitialized && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const AOS = (window as any).AOS;
        if (AOS && typeof AOS.refresh === 'function') {
          AOS.refresh();
        }
      }, 100);
    }
  }
}