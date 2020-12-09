import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos, RTOinfo } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  checkEmailNotTaken(email: string) {
      const params = new HttpParams()
      .set('email', email);
      
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateEmail/`  , {params}).pipe(
        map((statusList) => statusList )
         )
  }

  checkMobileNotTaken(mobile: string) {
    const params = new HttpParams()
    .set('mobile', mobile);
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateMobile`  , {params}).pipe(
        map((statusList) => statusList )
         )
  }
  getallcities(cityName: string) {
    const params = new HttpParams()
      .set('city', cityName);
    return this.http.get(`${environment.apiUrl}/common/getallcities`, { params })
      .pipe(
        map(response => response)
      );
  }
  getallstates() {
    return this.http.get(`${environment.apiUrl}/common/getallstates`)
      .pipe(
        map(response => response)
      );
  }
  getFilteredCities(stateid: string) {
    const params = new HttpParams()
      .set('stateid', stateid);
    return this.http.get(`${environment.apiUrl}/common/getfilteredcities`, { params })
      .pipe(
        map(response => response)
      );
  }
  getFilteredRTO(cityName: string) {
    const params = new HttpParams()
      .set('cityName', cityName);
    return this.http.get(`${environment.apiUrl}/common/getfilteredrtos`, { params })
      .pipe(
        map(response => response)
      );
  }

  
  
}
