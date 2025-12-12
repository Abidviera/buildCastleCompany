import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent extends AosBaseComponent implements OnInit {
  email = '';
  showScrollTop = false;
  currentYear = new Date().getFullYear();

  services = [
    'Planning & Supervision',
    'Cost Estimation',
    'Approval Drawings',
    'Interior Design',
    'Exterior Design',
    'Renovation Work',
    'Landscaping',
  ];

  quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.updateScrollTopVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollTopVisibility();
  }

  private updateScrollTopVisibility(): void {
    if (this.isBrowser) {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      this.showScrollTop = scrollPosition > 300;
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
      }
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  handleNewsletterSubmit(event: Event): void {
    event.preventDefault();
    if (this.isBrowser) {
      alert(`Thank you for subscribing! We'll send updates to ${this.email}`);
    }
    this.email = '';
  }
}
