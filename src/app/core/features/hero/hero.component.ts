import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  accent: string;
}

interface StatData {
  value: number;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent extends AosBaseComponent {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;

  heroSlides: HeroSlide[] = [
    {
      title: 'BUILD YOUR DREAM HOME',
      subtitle:
        'Expert Engineers, Quality Construction, and Innovative Design Solutions',
      image: 'home.webp',
      accent: 'WITH US',
    },
    {
      title: 'TURNING VISIONS INTO REALITY',
      subtitle:
        'Complete Planning, Contracting, and Supervision Services in Kallumpuram',
      image:
        'https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBleHRlcmlvciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQ5NjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      accent: 'REALITY',
    },
    {
      title: 'INTERIOR & EXTERIOR EXCELLENCE',
      subtitle: 'Creating Spaces That Inspire and Elevate Your Lifestyle',
      image: 'interior.webp',
      accent: 'EXCELLENCE',
    },
  ];

  currentSlide = 0;
  previousSlide = -1;
  scrollY = 0;
  parallaxY = 0;
  progressWidth = 0;
  mousePosition = { x: 0, y: 0 };

  statsData: StatData[] = [
    { value: 0, label: 'Years of Experience' },
    { value: 0, label: 'Projects' },
    { value: 0, label: 'Satisfied Clients' },
    { value: 0, label: 'Team Members' },
  ];

  private autoSlideTimer: any;
  private progressAnimationFrame: any;
  private statsAnimationFrame: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  protected override onAosReady(): void {
    super.onAosReady();
    if (this.isBrowser) {
      this.startAutoSlide();
      this.startCounterAnimation();
      this.startProgressAnimation();
    }
  }

  override ngOnDestroy(): void {
    this.clearTimers();
    super.ngOnDestroy();
  }

  private clearTimers(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
    if (this.progressAnimationFrame) {
      cancelAnimationFrame(this.progressAnimationFrame);
    }
    if (this.statsAnimationFrame) {
      cancelAnimationFrame(this.statsAnimationFrame);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.heroSection?.nativeElement && this.isBrowser) {
      const rect = this.heroSection.nativeElement.getBoundingClientRect();
      this.mousePosition = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    }
  }

  private startAutoSlide(): void {
    if (!this.isBrowser) return;

    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }

    this.autoSlideTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  private startProgressAnimation(): void {
    if (!this.isBrowser) return;

    if (this.progressAnimationFrame) {
      cancelAnimationFrame(this.progressAnimationFrame);
    }

    this.progressWidth = 0;
    const duration = 5000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.progressWidth = progress * 100;

      if (progress < 1) {
        this.progressAnimationFrame = requestAnimationFrame(animate);
      }
    };

    this.progressAnimationFrame = requestAnimationFrame(animate);
  }

  private startCounterAnimation(): void {
    if (!this.isBrowser) return;

    if (this.statsAnimationFrame) {
      cancelAnimationFrame(this.statsAnimationFrame);
    }

    const duration = 2000;
    const startTime = performance.now();

    const targets = [
      { value: 10, label: 'Years of Experience' },
      { value: 150, label: 'Projects' },
      { value: 200, label: 'Satisfied Clients' },
      { value: 6, label: 'Team Members' },
    ];

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      this.statsData = targets.map((target) => ({
        value: Math.floor(target.value * easedProgress),
        label: target.label,
      }));

      if (progress < 1) {
        this.statsAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.statsData = targets;
      }
    };

    this.statsAnimationFrame = requestAnimationFrame(animate);
  }

  nextSlide(): void {
    this.previousSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    this.startProgressAnimation();
  }

  goToSlide(index: number): void {
    if (index !== this.currentSlide) {
      this.previousSlide = this.currentSlide;
      this.currentSlide = index;
      this.startProgressAnimation();
      this.startAutoSlide();
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

  getCurrentWords(): string[] {
    return this.heroSlides[this.currentSlide].title.split(' ');
  }

  isAccentWord(word: string): boolean {
    return this.heroSlides[this.currentSlide].accent.includes(word);
  }

  getTitlePreview(title: string): string {
    return title.split(' ').slice(0, 3).join(' ');
  }
}
