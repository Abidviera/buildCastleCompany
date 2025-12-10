import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AosService } from './services/aos.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
 title = 'buildcastle';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aosService: AosService
  ) {}

  ngOnInit(): void {
    // Initialize AOS globally once when app starts
    if (isPlatformBrowser(this.platformId)) {
      this.aosService.init({
        offset: 120,
        delay: 0,
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
      });
    }
  }
}
