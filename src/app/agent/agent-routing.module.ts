import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/agent/layout.component';
import { AuthGuard } from '@app/_helpers';
import { AgentLeadsComponent } from './dashboard/agent-leads/agent-leads.component';
import { BookingComponent } from './dashboard/booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { InsuranceComponent } from './dashboard/insurance/insurance.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
     ]
  } ,
  {path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent   , canActivate: [AuthGuard]},
      { path: 'insureance', component: InsuranceComponent , canActivate: [AuthGuard]},
      { path: 'leads', component: AgentLeadsComponent , canActivate: [AuthGuard]},
      { path: 'booking', component: BookingComponent , canActivate: [AuthGuard]} ,
      { path: 'profile-view', component: EditProfileComponent , canActivate: [AuthGuard]}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
