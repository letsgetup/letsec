import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService,AgentService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService, private agentService : AgentService) {
        this.user = this.accountService.userValue;
     
    }
}