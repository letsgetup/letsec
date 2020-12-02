import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AgentService } from '@app/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private agentService: AgentService
    ) {
        if (this.agentService.agentuserValue) {
            this.router.navigate(['./agent/dashboard']);
        }


    }
}