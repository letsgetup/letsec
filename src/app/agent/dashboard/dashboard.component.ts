import { Component, OnInit } from '@angular/core';
import { AgentUser } from '@app/_models';
import { AgentService } from '@app/_services';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.less'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  agentuser: AgentUser;
  constructor(private agentService: AgentService) { 
    this.agentuser = this.agentService.agentuserValue; 
  }

   ngOnInit(): void {
  }
  agentlogout(){
    this.agentService.logout();
  }
}
