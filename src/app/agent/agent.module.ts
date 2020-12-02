import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { AgentLeadsComponent } from './dashboard/agent-leads/agent-leads.component';
import { InsuranceComponent } from './dashboard/insurance/insurance.component';
import { BookingComponent } from './dashboard/booking/booking.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    EditProfileComponent,
    WelcomeComponent,
    AgentLeadsComponent,
    InsuranceComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgentRoutingModule,
    NgbModule,
    SharedModule    
    
  ]
})
export class AgentModule { }
