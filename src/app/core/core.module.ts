import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LandingpageContainerComponent } from './features/landingpage-container/landingpage-container.component';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from './features/services/services.component';
import { HeroComponent } from './features/hero/hero.component';
import { HeaderComponent } from './features/header/header.component';
import { ServicesdetailedComponent } from './features/servicesdetailed/servicesdetailed.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectsCarouselComponent } from './features/projects-carousel/projects-carousel.component';
import { ProcessComponent } from './features/process/process.component';
import { CostCalculatorComponent } from './features/cost-calculator/cost-calculator.component';
import { WhyChooseUsComponent } from './features/why-choose-us/why-choose-us.component';
import { SpecialFeaturesComponent } from './features/special-features/special-features.component';
import { PremiumFeaturesComponent } from './features/premium-features/premium-features.component';
import { TeamShowcaseComponent } from './features/team-showcase/team-showcase.component';
import { BeforeAfterComponent } from './features/before-after/before-after.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { TestimonialsCarouselComponent } from './features/testimonials-carousel/testimonials-carousel.component';
import { FaqComponent } from './features/faq/faq.component';
import { QuickQuoteComponent } from './features/quick-quote/quick-quote.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';


@NgModule({
  declarations: [
    LandingpageContainerComponent,
    ServicesComponent,
    HeroComponent,
    HeaderComponent,
    ServicesdetailedComponent,
    AboutComponent,
    ProjectsCarouselComponent,
    ProcessComponent,
    CostCalculatorComponent,
    WhyChooseUsComponent,
    SafeHtmlPipe,
    SpecialFeaturesComponent,
    PremiumFeaturesComponent,
    TeamShowcaseComponent,
    BeforeAfterComponent,
    CertificationsComponent,
    GalleryComponent,
    TestimonialsCarouselComponent,
    FaqComponent,
    QuickQuoteComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ]
})
export class CoreModule { }
