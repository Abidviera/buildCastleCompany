import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends AosBaseComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  };

  services = [
    'Planning & Contracting',
    'Estimation',
    'Approvals & Drawings',
    'Interior Design',
    'Exterior Design',
    'Renovation',
    'Landscaping',
    'General Inquiry',
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const button = event.target as HTMLElement;
    const submitButton = button.closest('button') || button;
    const originalHTML = submitButton.innerHTML;

    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.classList.add('sending');

    const message = `Hello BUILD CASTLE!\n\nName: ${this.formData.name}\nEmail: ${this.formData.email}\nPhone: ${this.formData.phone}\nService Interested: ${this.formData.service}\nMessage: ${this.formData.message}`;

    setTimeout(() => {
      const whatsappUrl = `https://wa.me/919847088914?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, '_blank');

      submitButton.innerHTML = originalHTML;
      submitButton.classList.remove('sending');

      this.formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      };
    }, 600);
  }
}
