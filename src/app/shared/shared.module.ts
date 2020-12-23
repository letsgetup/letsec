import { NgModule } from '@angular/core';
import { NgbModule,NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from '@app/agent/agent-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashSidebarComponent } from './components/dash-sidebar/dash-sidebar.component';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { FormsModule } from '@angular/forms';
import { ListingComponent } from './components/listing/listing.component';
import { TwoWheelerFilterComponent } from './components/two-wheeler-filter/two-wheeler-filter.component';




@NgModule({
  declarations: [
    DashSidebarComponent,
    MainFooterComponent,
    MainHeaderComponent,
    VehicleInfoComponent,
    TwoWheelerFilterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbTypeaheadModule
   ] ,
  exports: [
    DashSidebarComponent,
    MainFooterComponent,
    MainHeaderComponent,
    VehicleInfoComponent,
    TwoWheelerFilterComponent
   ]
})
export class SharedModule { }
