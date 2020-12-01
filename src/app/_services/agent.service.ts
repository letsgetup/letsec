import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { catchError, map, subscribeOn } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentUser } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agentuserSubject: BehaviorSubject<AgentUser>;
  public agentuser: Observable<AgentUser>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.agentuserSubject = new BehaviorSubject<AgentUser>(JSON.parse(localStorage.getItem('agentuser')));
    this.agentuser = this.agentuserSubject.asObservable();
  }

  public get agentuserValue(): AgentUser {
    return this.agentuserSubject.value;
  }
  getAgentById(agentId: string) {
    let params = new HttpParams().set('agentid', agentId);
    return this.http.get<any>(`${environment.apiUrl}/agent/agentDetails`, { params }).pipe(
      map((res) => {
        return res;
      }));
  }

  getAllAgentLeades(agentId: string) {
    let params = new HttpParams().set('agentid', agentId);
    return this.http.get<any>(`${environment.apiUrl}/agent/agentLeadDetails`, { params }).pipe(
      map((res) => {
        return res;
      }));
  }


  login(agentLogin: FormData) {

    const formData: FormData = new FormData();
    formData.append("username", agentLogin['username']);
    formData.append("password", agentLogin['password']);


    return this.http.post<any>(`${environment.apiUrl}/agent/getLoginDetails`, formData)
      .pipe(map(agentuser => {

        localStorage.setItem('agentuser', agentuser);
        this.agentuserSubject.next(JSON.parse(agentuser));
        return agentuser;
      }));

  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('agentuser');
    this.agentuserSubject.next(null);
    this.router.navigate(['/agent/login']);
  }


}
