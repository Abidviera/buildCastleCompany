import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

interface GalleryImage {
  src: string;
  alt: string;
  error?: boolean;
}

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent extends AosBaseComponent {
  galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5MTU4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Luxury Interior',
    },
    {
      src: 'https://images.unsplash.com/photo-1657758481156-fbed1d83e694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NjA4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Modern Kitchen',
    },
    {
      src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NDkxMDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Living Room',
    },
    {
      src: 'https://images.unsplash.com/photo-1639751907353-3629fc00d2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0OTMxODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Bedroom Design',
    },
    {
      src: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ4NzQ5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Bathroom Design',
    },
    {
      src: 'https://images.unsplash.com/photo-1595387426256-cc153122a6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY0OTU0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Landscape Design',
    },
  ];

  errorImageSrc =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
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
    }
  }
}
