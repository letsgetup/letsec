import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { MotorRoutingModule } from './motor-routing.module';
import { CarComponent } from './car/car.component';
import { TwoWheelerComponent } from './two-wheeler/two-wheeler.component';
import { LayoutComponent } from './layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { ListingComponent } from '@app/shared/components/listing/listing.component';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MotorRoutingModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    CarComponent,
    TwoWheelerComponent,
    ThirdPartyComponent,
    ListingComponent
 
  ]
  
})
export class MotorModule { }
