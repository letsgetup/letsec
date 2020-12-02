import { Component } from '@angular/core';

import { AccountService, AgentService } from './_services';
import { User } from './_models';
import { AgentUser } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    agentuser : AgentUser

    constructor(private accountService: AccountService, private agentService: AgentService ) {
        this.accountService.user.subscribe(x => this.user = x);
        this.agentService.agentuser.subscribe(x => this.agentuser = x);
    }

    logout() {
        this.accountService.logout();
    }

    agentlogout() {
        this.agentService.logout();
    }
}