import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from '@app/agent/agent-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashSidebarComponent } from './components/dash-sidebar/dash-sidebar.component';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';



@NgModule({
  declarations: [
    DashSidebarComponent,
    MainFooterComponent,
    MainHeaderComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
   ] ,
  exports: [
    DashSidebarComponent,
    MainFooterComponent,
    MainHeaderComponent
   ]
})
export class SharedModule { }
