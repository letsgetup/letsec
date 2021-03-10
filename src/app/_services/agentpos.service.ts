import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { catchError, map, subscribeOn } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos } from '@app/_models';
import { PincodeM } from '@app/_models';


@Injectable({
  providedIn: 'root'
})
export class AgentposService {
   constructor(
    private router: Router,
    private http: HttpClient
  ) { 

    
  }

  agentposconfirmregister(agentpos): Observable<any> {
    //console.log(agentpos)
    return this.http.post(`${environment.apiUrl}/Agent/registerposagent`, agentpos);
  }

  getAllPincodeDetails(pincode: string): Observable<any> {
    let params = new HttpParams()
      .set('pincode', pincode);
    return this.http.get(`${environment.apiUrl}/Agent/getpincodedetails/${pincode}`);
  }
  getAllPincode(pincode: string): Observable<any> {
    let params = new HttpParams()
      .set('pincode', pincode);
    return this.http.get<PincodeM>(`${environment.apiUrl}/Agent/getpincodedetails/${pincode}`)
      .pipe(
        map(response => response)
      );
  }
}
