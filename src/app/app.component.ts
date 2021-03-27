import { Component, OnDestroy, OnInit } from '@angular/core';
import { Spinkit, SpinnerVisibilityService } from 'ng-http-loader';
import { AccountService, AgentService, LtsSharedService } from './_services';
import { AgentKYC, User } from './_models';
import { Router } from '@angular/router';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit, OnDestroy {
    user: User;
    agentuser: AgentKYC;
    httpStatus: boolean;
    spinnerStyle = Spinkit;

    constructor(private accountService: AccountService, private agentService: AgentService,
        private shareService: LtsSharedService,public router: Router, spinVisible: SpinnerVisibilityService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.agentService.agentuser.subscribe(x => this.agentuser = x);
        spinVisible.show;
        //this.shareService.getHttpStatus().subscribe((status: boolean) => { this.httpStatus = status; });
    }

    ngOnInit() {
        //let interval = setInterval(() => {}, 1000);
    }

    logout() {
        this.accountService.logout();
    }

    agentlogout() {
        this.agentService.logout();
    }

    ngOnDestroy() {
        //clearInterval();
    }
}