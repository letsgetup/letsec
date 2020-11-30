import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from '@app/agent/agent-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashSidebarComponent } from './components/dash-sidebar/dash-sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
   ] ,
  exports: [
    DashSidebarComponent
   ]
})
export class SharedModule { }
