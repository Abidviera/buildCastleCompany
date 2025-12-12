import {
  Component,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-quick-quote',
  standalone: false,
  templateUrl: './quick-quote.component.html',
  styleUrl: './quick-quote.component.scss',
})
export class QuickQuoteComponent extends AosBaseComponent {
  @ViewChild('formSection') formSection!: ElementRef;

  formData = {
    name: '',
    phone: '',
    service: '',
    timeline: '',
  };

  services = [
    'Select a service',
    'New Construction',
    'Renovation',
    'Interior Design',
    'Exterior Design',
    'Landscaping',
    'Estimation Only',
    'Approvals & Drawings',
    'General Consultation',
  ];

  timelines = [
    'Select timeline',
    'Immediately',
    'Within 1 Month',
    '1-3 Months',
    '3-6 Months',
    'Just Planning / Exploring',
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const message = `Quick Quote Request from BUILD CASTLE Website

Name: ${this.formData.name}
Phone: ${this.formData.phone}
Service: ${this.formData.service}
Timeline: ${this.formData.timeline}

Please contact me with more details and pricing.`;

    const whatsappUrl = `https://wa.me/919847088914?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');

    this.formData = {
      name: '',
      phone: '',
      service: '',
      timeline: '',
    };
  }
}
