import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { catchError, map, subscribeOn } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentKYC } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agentuserSubject: BehaviorSubject<AgentKYC>;
  public agentuser: Observable<AgentKYC>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.agentuserSubject = new BehaviorSubject<AgentKYC>(JSON.parse(localStorage.getItem('agentuser')));
    this.agentuser = this.agentuserSubject.asObservable();
  }

  public get agentuserValue(): AgentKYC {
    return this.agentuserSubject.value;
  }
  getAgentById(agentId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/agent/getagentdetails/${agentId}`).pipe(
      map((res) => {
        return res;
      }));
  }

  getAllAgentLeades(agentId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/agent/getleaddetails/${agentId}`).pipe(
      map((res) => {
        return res;
      }));
  }

  addAgentLeade(agentLead) {
    return this.http.post<any>(`${environment.apiUrl}/agent/addlead`, agentLead ).pipe(
      map((res) => {
        return res;
      }));
     
  }

  login(agentLogin: FormData) {

    const formData: FormData = new FormData();
    formData.append("email", agentLogin['username']);
    formData.append("password", agentLogin['password']);


    return this.http.post<any>(`${environment.apiUrl}/agent/agentlogin`, {'email': agentLogin['username'],'password':agentLogin['password']})
      .pipe(map(agentuser => {

        localStorage.setItem('agentuser', JSON.stringify(agentuser.agentdetails[0]));
        this.agentuserSubject.next(agentuser.agentdetails[0]);
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
