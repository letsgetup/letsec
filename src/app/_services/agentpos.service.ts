import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AgentposService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  agentposconfirmregister(agentpos: FormData) {
     //console.log(agentpos)
       return this.http.post(`http://localhost/letssecure/index.php/api/agentpos/confirmregistration`, agentpos);
  }
}
