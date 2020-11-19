import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import localeCm from "@angular/common/locales/en-CM";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "../core/error.interceptor";
import { JwtInterceptor } from "../core/jwt.interceptor";
import { AuthGuard } from "../core/auth.guard";
import { TranslateModule } from "@ngx-translate/core";
import { LayoutRoutingModule } from './adminlayout-routing.module';
import { AdminlayoutComponent } from './adminlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxLoadingModule } from "ngx-loading";
import { UsersComponent } from './users/users.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from "../components/alert/alert.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import {
  NgbDropdownModule,
  NgbTabsetModule,
  NgbButtonsModule,
  NgbAlertModule,
  NgbDatepickerModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbAccordionModule
} from "@ng-bootstrap/ng-bootstrap";
import { DxDataGridModule, DxTooltipModule, DxTemplateModule } from "devextreme-angular";
import { PatientsComponent } from './patients/patients.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { RequestsComponent } from './requests/requests.component';
import { ModalRequestComponent } from './modal-request/modal-request.component';
import { ModalDrugsComponent } from './modal-drugs/modal-drugs.component';
import { DrugsComponent } from './drugs/drugs.component';
import { ModalUserDrugsComponent } from './modal-user-drugs/modal-user-drugs.component';

registerLocaleData(localeCm);

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbButtonsModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgbModalModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbAccordionModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      primaryColour: "#ffffff",
      secondaryColour: "#f06105"
    }),
    ReactiveFormsModule,
    DxDataGridModule, DxTooltipModule, DxTemplateModule
  ],
  declarations: [
    AdminlayoutComponent,
    DashboardComponent,
    SidebarComponent,
    UsersComponent,
    AlertComponent,
    SubscribersComponent,
    ProfileComponent,
    PatientsComponent,
    HeaderComponent,
    ModalUserComponent,
    RequestsComponent,
    ModalRequestComponent,
    ModalDrugsComponent,
    DrugsComponent,
    ModalUserDrugsComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "en-CM" }
  ]
})
export class AdminlayoutModule { }
