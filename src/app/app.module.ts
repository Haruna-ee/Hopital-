import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./core/error.interceptor";
import { JwtInterceptor } from "./core/jwt.interceptor";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LanguageTranslationModule } from "./shared/modules/language-translation/language-translation.module";
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginAlertComponent } from './components/login-alert/login-alert.component';
import { DxDataGridModule, DxTooltipModule, DxTemplateModule } from "devextreme-angular";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    DxDataGridModule, DxTooltipModule, DxTemplateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent, LoginComponent, RegisterComponent, LoginAlertComponent],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

