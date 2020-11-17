import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TeamComponent } from './team/team.component';
import { OurservicesComponent } from './ourservices/ourservices.component';
import { ContactComponent } from './contact/contact.component';
import { RequestComponent } from './request/request.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LandingComponent,
    RequestComponent,
    FooterComponent,
    GalleryComponent,
    TeamComponent,
    OurservicesComponent,
    ContactComponent,
    RequestComponent,
    TestimonialsComponent,
    NavigationComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutModule {}
