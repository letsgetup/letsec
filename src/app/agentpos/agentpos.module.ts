import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgentposRoutingModule } from './agentpos-routing.module';
import { LayoutComponent } from './layout.component';
import { AgentposComponent } from './agentpos.component';
import { AgentkycComponent } from './agentkyc.component';
import { AgentconfirmComponent } from './agentconfirm.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgentposRoutingModule,
    NgbModule
  ],
  declarations: [
    LayoutComponent,
    AgentposComponent,
    AgentkycComponent,
    AgentconfirmComponent,
   
  ]

})

export class AgentposModule { }
