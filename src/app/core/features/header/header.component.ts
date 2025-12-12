import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { AosService } from '../../../services/aos.service';
import { AosBaseComponent } from '../../base/aos.base.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AosBaseComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  scrollToSection(id: string): void {
    if (this.isBrowser) {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        this.isMobileMenuOpen = false;

        this.aosService.refreshAfterDelay(500);
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
