import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ApplicationRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AosService } from './services/aos.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'build-castle';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aosService: AosService,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.appRef.isStable
        .pipe(first((stable) => stable === true))
        .subscribe(() => {
          setTimeout(() => {
            this.aosService.initialize();
          }, 300);
        });
    }
  }
}
