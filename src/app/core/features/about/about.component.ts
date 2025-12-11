import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private scrollSubscription!: Subscription;
  private aosInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
      this.setupScrollListener();
    }
  }

  private initializeAOS(): void {
    import('aos').then((aos) => {
      aos.default.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        disable: false,
        anchorPlacement: 'top-bottom',
        mirror: false,
        throttleDelay: 99,
        debounceDelay: 50,
      });
      this.aosInitialized = true;
    });
  }

  private setupScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => {
        this.handleScroll();
      });
  }

  private handleScroll(): void {
    const scrollPosition = window.scrollY;

    if (
      window.innerWidth < 768 &&
      !this.aosInitialized &&
      scrollPosition > 300
    ) {
      this.initializeAOS();
    }
  }
}
