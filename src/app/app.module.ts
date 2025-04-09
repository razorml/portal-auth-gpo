import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './pages/login/login.service';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorDialogComponent } from './pages/error-dialog/error-dialog.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzResultModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    AppRoutingModule,
    NzAlertModule,
    RouterModule
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
