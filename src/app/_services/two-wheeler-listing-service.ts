import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwoWheelerListingService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllBikeQuoteListDi(requestPara) {
    //console.log(requestPara)
    const params = new HttpParams()
      .set('requestPara', requestPara);
      return this.http.post(`${environment.apiUrl}/bike/getQuote_1`, {requestPara})
      .pipe(
         map(response => response)
      );

    }
}
