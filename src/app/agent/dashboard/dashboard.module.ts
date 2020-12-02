import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AgentLeadsComponent } from './agent-leads/agent-leads.component';
import { BookingComponent } from './booking/booking.component';
import { InsuranceComponent } from './insurance/insurance.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbModule,
    SharedModule
    
  ]
})
export class DashboardModule { }
