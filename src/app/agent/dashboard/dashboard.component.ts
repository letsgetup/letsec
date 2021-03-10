import { Component, OnInit } from '@angular/core';
import { AgentKYC } from '@app/_models';
import { AgentService } from '@app/_services';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.less'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  agentuser: AgentKYC;
  constructor(private agentService: AgentService) { 
    this.agentuser = this.agentService.agentuserValue; 
    this.agentuser.Role = "Agent"; //Set by default from UI Need to addd field in backend and db
  }

   ngOnInit(): void {
  }
  agentlogout(){
    this.agentService.logout();
  }
}
