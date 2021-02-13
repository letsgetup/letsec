import { Component, OnInit } from '@angular/core';

import { AccountService, AgentService, LtsSharedService } from './_services';
import { User } from './_models';
import { AgentUser } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    user: User;
    agentuser : AgentUser;
    httpStatus: boolean;

    constructor(private accountService: AccountService, private agentService: AgentService, 
        private shareService: LtsSharedService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.agentService.agentuser.subscribe(x => this.agentuser = x);
        //this.shareService.getHttpStatus().subscribe((status: boolean) => { this.httpStatus = status; });
    }

    ngOnInit() {
        
      }

    logout() {
        this.accountService.logout();
    }

    agentlogout() {
        this.agentService.logout();
    }
}