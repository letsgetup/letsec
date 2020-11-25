import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { catchError, map, subscribeOn } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos } from '@app/_models';
import { PincodeM } from '@app/_models'
@Injectable({
  providedIn: 'root'
})
export class AgentposService {
  pincodes: string[];
  pincodeary: Array<Object>[];
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  agentposconfirmregister(agentpos: FormData) {
    //console.log(agentpos)
    return this.http.post(`${environment.apiUrl}/agentpos/confirmregistration`, agentpos);
  }

  getAllPincodeDetails(pincode: string) {
    let params = new HttpParams()
      .set('pincode', pincode);
    return this.http.get(`${environment.apiUrl}/common/getpincodedetails`, { params });
  }
  getAllPincode(pincode: string) {
    console.log("pincode" + pincode);
    let params = new HttpParams()
      .set('pincode', pincode);


    return this.http.get<PincodeM>(`${environment.apiUrl}/common/getpincodes`, { params })
      .pipe(
        map(response => response)
      );
  }
}
