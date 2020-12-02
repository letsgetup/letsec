import { Component, OnInit } from '@angular/core';
import { AgentUser } from '@app/_models';
import { AgentService } from '@app/_services';
import { first } from 'rxjs/operators';


interface Leades {
  name: string;
  mobile: string;
  email: number;
  status: number;
  policy: string;

}




@Component({
  selector: 'app-agent-leads',
  templateUrl: './agent-leads.component.html'
})
export class AgentLeadsComponent implements OnInit {
  leadDetails: any = [];
  agentuser: AgentUser;
  agentid: string;

  constructor(private agentService: AgentService) {
    this.agentuser = this.agentService.agentuserValue;
    this.agentid = this.agentuser.agentid;
  }

  ngOnInit(): void {
    this.agentService.getAllAgentLeades(this.agentid)
      .pipe(first())
      .subscribe(leadDetails => {
        this.leadDetails =JSON.parse( leadDetails);
        console.log(this.leadDetails)
      });
  }

}
