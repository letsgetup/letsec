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
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateEmail/`, { params }).pipe(
      map((statusList) => statusList)
    )
  }

  checkMobileNotTaken(mobile: string) {
    const params = new HttpParams()
      .set('mobile', mobile);
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateMobile`, { params }).pipe(
      map((statusList) => statusList)
    )
  }

  getselectedrtodata(rtodetails: string) {
    const params = new HttpParams()
      .set('region_code', rtodetails);
    return this.http.get(`${environment.apiUrl}/common/getselectedrtodata`, { params })
      .pipe(
        map(response => response)
      );
  }

  getSearchedrtos(troterm: string) {
    const params = new HttpParams()
      .set('region', troterm);
    return this.http.get(`${environment.apiUrl}/common/getSearchedrtos`, { params })
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
  getstateonrto(rtoTerm: string) {
    const params = new HttpParams()
      .set('region_code', rtoTerm);
    return this.http.get(`${environment.apiUrl}/common/getstateonrto`, { params })
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
  getSearchedmaker(makerterm: string) {
    const params = new HttpParams()
      .set('make', makerterm);
    return this.http.get(`${environment.apiUrl}/common/getSearchedmaker`, { params })
      .pipe(
        map(response => response)
      );
  }
  getallmakers() {

    return this.http.get(`${environment.apiUrl}/common/getallmaker`)
      .pipe(
        map(response => response)
      );
  }
  getFilteredmodels(makeName: string) {
    const params = new HttpParams()
      .set('maker', makeName);
    return this.http.get(`${environment.apiUrl}/common/getfilteredmodels`, { params })
      .pipe(
        map(response => response)
      );
  }
  getFilteredFuelVersions(modelName: string) {
    const params = new HttpParams()
      .set('model', modelName);
    return this.http.get(`${environment.apiUrl}/common/getfilteredfuelversions`, { params })
      .pipe(
        map(response => response)
      );
  }
  getselectedmakerdata(makerdetails: string) {
    const params = new HttpParams()
      .set('Make', makerdetails);
    return this.http.get(`${environment.apiUrl}/common/getselectedmakerdata`, { params })
      .pipe(
        map(response => response)
      );
  }
}