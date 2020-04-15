import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ServerApiService } from './services/server-api.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { NgSelectModule } from '@ng-select/ng-select';

//locales
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { Regstep01Component } from './components/regstep01/regstep01.component';
import { RegisterFlowComponent } from './components/register-flow/register-flow.component';
import { Regstep02Component } from './components/regstep02/regstep02.component';
import { RegTlushDataComponent } from './components/regtlushdata/regtlushdata.component';
registerLocaleData(localeHe, 'he');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    Regstep01Component,
    RegisterFlowComponent,
    Regstep02Component,
    RegTlushDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    ServerApiService,
    AlertService,
    { provide: LOCALE_ID, useValue: "he" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
