import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LandingpageContainerComponent } from './features/landingpage-container/landingpage-container.component';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from './features/services/services.component';
import { HeroComponent } from './features/hero/hero.component';
import { HeaderComponent } from './features/header/header.component';


@NgModule({
  declarations: [
    LandingpageContainerComponent,
    ServicesComponent,
    HeroComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ]
})
export class CoreModule { }
