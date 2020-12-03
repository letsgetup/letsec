import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  templateUrl: './agent-error.component.html'
})
export class AgenterrorComponent implements OnInit, OnDestroy {
  _session: string;
   message = '';
 // posKycForm: FormGroup;
  //loading = false;
  // /submitted = false;
  
  constructor(
   private router: Router,

  ) {
    sessionStorage.removeItem("agentinfo");
    sessionStorage.removeItem('agentConfim_flg');
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
