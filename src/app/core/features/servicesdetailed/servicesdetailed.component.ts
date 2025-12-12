import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  ServiceDetail,
  SERVICES_DATA,
} from '../../../models/service-detail.model';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

@Component({
  selector: 'app-servicesdetailed',
  standalone: false,
  templateUrl: './servicesdetailed.component.html',
  styleUrl: './servicesdetailed.component.scss',
})
export class ServicesdetailedComponent extends AosBaseComponent {
  servicesData: ServiceDetail[] = SERVICES_DATA;
  selectedService: ServiceDetail | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  selectService(service: ServiceDetail): void {
    this.selectedService = service;
  }

  closeModal(): void {
    this.selectedService = null;
    this.refreshAosOnDataChange();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
