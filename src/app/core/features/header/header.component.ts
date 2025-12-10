import { Component, HostListener, Inject, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  private scrollThreshold = 100;
  private resizeTimeout: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aosService: AosService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // AOS is initialized globally via service
      // No need to reinitialize here
      
      // Initial scroll check
      this.onWindowScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > this.scrollThreshold;
    }
  }

  scrollToSection(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = document.querySelector('.header')?.clientHeight || 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        this.isMobileMenuOpen = false;
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }
}