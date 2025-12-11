import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
interface Project {
  title: string;
  location: string;
  before: string;
  after: string;
  description: string;
}
@Component({
  selector: 'app-before-after',
  standalone: false,
  templateUrl: './before-after.component.html',
  styleUrl: './before-after.component.scss'
})
export class BeforeAfterComponent {
projects: Project[] = [
    {
      title: 'Complete Home Renovation',
      location: 'Kallumpuram',
      before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDk2MTgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NDkxMDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Transformed a 25-year-old house into a modern, luxurious home with contemporary design and premium finishes.'
    },
    {
      title: 'Kitchen Modernization',
      location: 'Kallumpuram',
      before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBraXRjaGVufGVufDF8fHx8MTc2NDk2MTgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1657758481156-fbed1d83e694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NjA4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Complete kitchen renovation with modular cabinets, modern appliances, and efficient storage solutions.'
    },
    {
      title: 'Exterior Transformation',
      location: 'Kallumpuram',
      before: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDk2MTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBleHRlcmlvciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQ5NjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Dramatic exterior makeover with contemporary facade, new textures, and landscape integration.'
    }
  ];

  activeSliders: { [key: number]: number } = {
    0: 50,
    1: 50,
    2: 50
  };

  errorImgSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

     constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {

    /* Initialize AOS Only in Browser */
    if (isPlatformBrowser(this.platformId)) {
      const AOS = (await import('aos')).default;

      AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: true,
        offset: 80,
      });

      // Important: Refresh after images load
      setTimeout(() => AOS.refresh(), 600);
    }
  }

  handleSliderChange(index: number, event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.activeSliders = { ...this.activeSliders, [index]: value };
  }

  getSliderPosition(index: number): string {
    return `${this.activeSliders[index]}%`;
  }

  getClipPath(index: number): string {
    const value = this.activeSliders[index];
    return `inset(0 ${100 - value}% 0 0)`;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.errorImgSrc;
    imgElement.style.objectFit = 'contain';
    imgElement.style.padding = '20px';
    imgElement.parentElement?.classList.add('image-error');
  }
}
