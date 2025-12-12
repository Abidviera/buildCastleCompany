import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface Project {
  category: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-projects-carousel',
  standalone: false,
  templateUrl: './projects-carousel.component.html',
  styleUrl: './projects-carousel.component.scss',
})
export class ProjectsCarouselComponent extends AosBaseComponent {
  currentIndex = 0;
  itemsPerView = 3;
  isMobile = false;

  errorImageSrc =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
  imageErrors: { [key: number]: boolean } = {};

  projects: Project[] = [
    {
      category: 'Interior Design',
      title: 'Modern Living Spaces',
      description: 'Contemporary interior design with elegant finishes',
      image:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NDkxMDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'Exterior Design',
      title: 'Contemporary Architecture',
      description: 'Modern exterior design with clean lines',
      image:
        'https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBleHRlcmlvciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQ5NjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'Interior Design',
      title: 'Luxury Kitchen Design',
      description: 'Functional and beautiful kitchen spaces',
      image:
        'https://images.unsplash.com/photo-1657758481156-fbed1d83e694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NjA4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'Landscaping',
      title: 'Garden Paradise',
      description: 'Beautifully landscaped outdoor spaces',
      image:
        'https://images.unsplash.com/photo-1595387426256-cc153122a6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY0OTU0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'Renovation',
      title: 'Complete Home Transformation',
      description: 'Modern renovation with premium finishes',
      image:
        'https://images.unsplash.com/photo-1646592491963-07ff7e7c31f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDk0NTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'Interior Design',
      title: 'Elegant Bedroom Suite',
      description: 'Peaceful and luxurious bedroom design',
      image:
        'https://images.unsplash.com/photo-1639751907353-3629fc00d2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0OTMxODIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }
  protected override onAosReady(): void {
    super.onAosReady();
    this.checkIfMobile();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 768;
      this.itemsPerView = this.isMobile ? 1 : 3;
    }
  }

  get visibleProjects(): Project[] {
    let visible = this.projects.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerView
    );

    if (visible.length < this.itemsPerView) {
      const remaining = this.itemsPerView - visible.length;
      visible.push(...this.projects.slice(0, remaining));
    }

    return visible;
  }

  get totalDots(): number[] {
    const total = Math.ceil(this.projects.length / this.itemsPerView);
    return Array(total)
      .fill(0)
      .map((_, i) => i);
  }

  nextSlide(): void {
    if (this.currentIndex + this.itemsPerView >= this.projects.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    // Automatically refresh AOS when data changes
    this.refreshAosOnDataChange();
  }

  prevSlide(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = Math.max(0, this.projects.length - this.itemsPerView);
    } else {
      this.currentIndex--;
    }
    this.refreshAosOnDataChange();
  }

  goToSlide(dotIndex: number): void {
    this.currentIndex = dotIndex * this.itemsPerView;
    this.refreshAosOnDataChange();
  }

  onImageError(projectIndex: number): void {
    this.imageErrors[projectIndex] = true;
  }

  shouldShowError(projectIndex: number): boolean {
    return !!this.imageErrors[projectIndex];
  }

  getCurrentProjectIndex(visibleIndex: number): number {
    return (this.currentIndex + visibleIndex) % this.projects.length;
  }

  getAnimationDelay(index: number): string {
    return index * 0.1 + 's';
  }

  isDotActive(dotIndex: number): boolean {
    return Math.floor(this.currentIndex / this.itemsPerView) === dotIndex;
  }
}
