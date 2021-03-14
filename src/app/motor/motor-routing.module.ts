import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/motor/layout.component';
import { PaymentComponent } from '@app/payment/payment.component';
import { ListingComponent } from '@app/shared/components/listing/listing.component';
import { CarComponent } from './car/car.component';
import { DateComponent } from './car/date.component';
import { CommercialVehicleComponent } from './commercial-vehicle/commercial-vehicle.component';
import { TaxiComponent } from './taxi/taxi.component';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { TwoWheelerComponent } from './two-wheeler/two-wheeler.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'car-insurance', component: CarComponent },
      { path: 'two-wheeler-insurance', component: TwoWheelerComponent },
      { path: 'third-party-insurance', component: ThirdPartyComponent },
      { path: 'taxi-insurance', component: TaxiComponent },
      { path: 'commercial-vehicle-insurance', component: CommercialVehicleComponent },
      { path: 'quotes', component: ListingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'date', component: DateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotorRoutingModule { }
