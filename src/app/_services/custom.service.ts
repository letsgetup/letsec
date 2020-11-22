import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  checkEmailNotTaken(email: string) {
      let params = new HttpParams()
      .set('email', email);
      
    return this.http.get(`http://localhost/letssecure/index.php/api/common/checkDuplicateEmail/`  , {params}).pipe(
        map((statusList) => statusList )
         )
  }

  checkMobileNotTaken(mobile: string) {
    let params = new HttpParams()
    .set('mobile', mobile);
    return this.http.get(`http://localhost/letssecure/index.php/api/common/checkDuplicateMobile`  , {params}).pipe(
        map((statusList) => statusList )
         )
  }

}
