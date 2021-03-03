import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/shared.module';
import { MotorModule } from './motor/motor.module';

import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './_helpers/progress-bar/progress-bar.component';
import { LtsSharedService } from './_services/sharedService';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { APIService } from './_services/api.service';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        MotorModule,
        NgbModule,
        NgHttpLoaderModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        ProgressBarComponent

    ],
    providers: [
      
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        LtsSharedService
        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };