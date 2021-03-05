import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AgentService, AlertService } from '@app/_services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  agentLoginform: FormGroup;
    loading = false;
    submitted = false;
    unauthorised = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private agentService: AgentService,
        private alertService: AlertService,
        private accountService : AccountService
    ) {
        if (this.agentService.agentuserValue) {
            this.router.navigate(['./agent/dashboard']);
        }
    }

    ngOnInit() {
        this.agentLoginform = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.agentLoginform.controls; }

    onSubmit() {
        // Fulsh all user login details when we login as Agent user
        if(this.accountService.userValue){
          this.accountService.flushUserdetails();
         }
        
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.agentLoginform.invalid) {
            return;
        }

        this.loading = true;
        this.agentService.login(this.agentLoginform.value)
            .subscribe(data=>{
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate(['/agent/dashboard']);
            },
            (error: HttpErrorResponse)=>{
                this.unauthorised = true;
                this.alertService.error(error.error);
                this.loading = false;
            });
    }
}