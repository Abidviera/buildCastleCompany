import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ServiceDetail,
  SERVICES_DATA,
} from '../../../models/service-detail.model';
import AOS from 'aos';

@Component({
  selector: 'app-servicesdetailed',
  standalone: false,
  templateUrl: './servicesdetailed.component.html',
  styleUrl: './servicesdetailed.component.scss',
})
export class ServicesdetailedComponent implements OnInit, OnDestroy {
  servicesData: ServiceDetail[] = SERVICES_DATA;
  selectedService: ServiceDetail | null = null;
  private aosInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.initAOS();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      AOS.refreshHard();
    }
  }

  private initAOS(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
      startEvent: 'DOMContentLoaded',
      throttleDelay: 99,
      debounceDelay: 50,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    this.aosInitialized = true;

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  selectService(service: ServiceDetail): void {
    this.selectedService = service;

    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
    }
  }

  closeModal(): void {
    this.selectedService = null;

    if (isPlatformBrowser(this.platformId) && this.aosInitialized) {
      setTimeout(() => {
        AOS.refresh();
      }, 300);
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
