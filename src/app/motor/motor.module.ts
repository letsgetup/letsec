import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotorRoutingModule } from './motor-routing.module';
import { CarComponent } from './car/car.component';
import { TwoWheelerComponent } from './two-wheeler/two-wheeler.component';
import { LayoutComponent } from './layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThirdPartyComponent } from './third-party/third-party.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MotorRoutingModule
  ],
  declarations: [
    LayoutComponent,
    CarComponent,
    TwoWheelerComponent,
    ThirdPartyComponent
  ]
  
})
export class MotorModule { }
