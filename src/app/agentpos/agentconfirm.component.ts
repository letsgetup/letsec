import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  templateUrl: './agentconfirm.component.html'
})
export class AgentconfirmComponent implements OnInit, OnDestroy {
  _session: string;
 // posKycForm: FormGroup;
  //loading = false;
  // /submitted = false;
  
  constructor(
   private router: Router,

  ) {
    if (sessionStorage.getItem('agentConfim_flg') != "DONE") {
        this.router.navigate(['../agentpos']);
     }
  }

  ngOnInit(): void {
    sessionStorage.removeItem("agentinfo");
    sessionStorage.removeItem('agentConfim_flg');
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("agentinfo");
    sessionStorage.removeItem('agentConfim_flg');
  }
}
