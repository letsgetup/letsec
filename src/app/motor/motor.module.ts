import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { MotorRoutingModule } from './motor-routing.module';
import { CarComponent } from './car/car.component';
import { TwoWheelerComponent } from './two-wheeler/two-wheeler.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { ListingComponent } from '@app/shared/components/listing/listing.component';
import { MotorInfoComponent } from './motor-info/motor-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSectionComponent } from './motor-info/user-section.component';
import { TaxiComponent } from './taxi/taxi.component';
import { CommercialVehicleComponent } from './commercial-vehicle/commercial-vehicle.component';
import { DateComponent } from './car/date.component';
import { NgxCalendarModule } from "ss-ngx-calendar";



@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    MotorRoutingModule,
    SharedModule,
    FormsModule,
    NgxCalendarModule
  ],
  
  declarations: [
    LayoutComponent,
    CarComponent,
    TwoWheelerComponent,
    ThirdPartyComponent,
    ListingComponent,
    MotorInfoComponent,
    UserSectionComponent,
    TaxiComponent,
    CommercialVehicleComponent,
    DateComponent
 
  ]
  
})
export class MotorModule { }
