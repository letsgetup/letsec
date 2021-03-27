import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AgentPos, RTOinfo } from '@app/_models';


@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  checkEmailNotTaken(email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email);
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateEmail/`, { params }).pipe(
      map((statusList) => statusList)
    )
  }

  checkMobileNotTaken(mobile: string): Observable<any> {
    const params = new HttpParams()
      .set('mobile', mobile);
    return this.http.get(`${environment.apiUrl}/common/checkDuplicateMobile`, { params }).pipe(
      map((statusList) => statusList)
    )
  }

  getselectedrtodata(rtodetails: string): Observable<any> {
    const params = new HttpParams()
      .set('region_code', rtodetails);
    return this.http.get(`${environment.azureApi}api/rto`, { params })
      .pipe(
        map(response => response)
      );
  }

  getSearchedrtos(searchedText: string): Observable<any> {
    let params = new HttpParams().set('searchWord', searchedText);
    return this.http.get(`${environment.azureApiUrl}/api/RTOs/getrtos`, { params: params })
      .pipe(
        map(response => response)
      );
  }

  getSearchedStates(searchedText: string): Observable<any> {
    let params = new HttpParams().set('searchTerm', searchedText);
    return this.http.get(`${environment.azureApiUrl}/api/states`, { params: params })
      .pipe(
        map(response => response)
      );
  }

  getSearchedCities(searchedText: string): Observable<any> {
    let params = new HttpParams().set('searchTerm', searchedText);
    return this.http.get(`${environment.azureApiUrl}/api/cities`, { params: params })
      .pipe(
        map(response => response)
      );
  }

  getallstates(): Observable<any> {
    return this.http.get(`${environment.azureApiUrl}/api/states`)
      .pipe(
        map(response => response)
      );
  }

  getstateonrto(rtoTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('region_code', rtoTerm);
    return this.http.get(`${environment.azureApi}api/rto`, { params })
      .pipe(
        map(response => response)
      );
  }

  getFilteredCities(stateid: string): Observable<any> {
    const params = new HttpParams()
      .set('stateid', stateid);
    return this.http.get(`${environment.azureApi}api/city`, { params })
      .pipe(
        map(response => response)
      );
  }

  getFilteredRTO(cityName: string): Observable<any> {
    const params = new HttpParams()
      .set('cityName', cityName);
    return this.http.get(`${environment.apiUrl}/common/getfilteredrtos`, { params })
      .pipe(
        map(response => response)
      );
  }

  getSearchedmaker(makerterm: string, motorType: string): Observable<any> {
    let motor = motorType === 'Car' ? '4W' : '2W';
    const params = new HttpParams().set('searchWord', makerterm)
                                 .set('vehicleType', motor);
    return this.http.get(`${environment.azureApiUrl}/api/VehicleData/getvehiclemanufacturer`, { params })
      .pipe(
        map(response => response)
      );
  }

  getTmpSearchedModel(makerterm: string, motorType: string): Observable<any> {
    let motor = motorType === 'Car' ? '4W' : '2W';
    const params = new HttpParams().set('searchWord', makerterm)
                                     .set('vehicleType', motor);
    return this.http.get(`${environment.azureApiUrl}/api/VehicleData/getvehiclemodel`, { params })
      .pipe(map(response => response));
  }

  getTmpSearchedVariants(makerterm: string, model: string): Observable<any> {
    const params = new HttpParams().set('make', makerterm).set('model', model);
    return this.http.get(`${environment.azureApiUrl}/api/VehicleData/getvehiclevariant`, { params })
      .pipe( map(response => response));
  }

  getTmpSearchedFueltypes(maker: string, model: string, variant: string): Observable<any> {
    const params = new HttpParams().set('make', maker)
      .set('model', model).set('variant', variant);
    return this.http.get(`${environment.azureApiUrl}/api/VehicleData/getvehiclefueltype`, { params })
      .pipe( map(response => response));
  }

  getallmakers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/common/getallmaker`)
      .pipe(
        map(response => response)
      );
  }

  getFilteredmodels(makeName: string): Observable<any> {
    const params = new HttpParams()
      .set('searchTerm', makeName);
    return this.http.get(`${environment.azureApiUrl}/api/vehicledata/models`, { params })
      .pipe(
        map(response => response)
      );
  }

  getFilteredFuelVersions(modelName: string): Observable<any> {
    const params = new HttpParams()
      .set('model', modelName);
    return this.http.get(`${environment.apiUrl}/common/getfilteredfuelversions`, { params })
      .pipe(
        map(response => response)
      );
  }
  
  getselectedmakerdata(makerdetails: string): Observable<any> {
    const params = new HttpParams()
      .set('Make', makerdetails);
    return this.http.get(`${environment.apiUrl}/common/getselectedmakerdata`, { params })
      .pipe(
        map(response => response)
      );
  }

  getLocalJsonFileData(jsonFilePath: string): Observable<any> {
    return this.http.get(jsonFilePath).pipe(
      map(response => response)
    );
  }

  getDemoListingData(body: any): Observable<any> {
    const params = new HttpParams()
      .set('Make', body);
    return this.http.get(`${environment.azureApiUrl}/api/qc/processquickquotes`, { params })
      .pipe(
        map(response => response), catchError(this.handleError)
      );
  }

  getQuickQuotesDetails(vehicleDetails: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.swagApiUrl}/api/QuickQuote/getquickquote`, JSON.stringify(vehicleDetails), {headers});
  }

  getThirdPartyInsurance(policyDetails: any, vehicleDetails: any): Observable<any> {
    let auth = JSON.stringify({username:'1215012021', password:'3AF54AAD-91E2-4285-AEE7-889363A576F2'});
    const url = "http://52.172.5.3:8423/api/MotorAPI/GetVehicleIDV";
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST');
      //headers.append('Authorization', 'Basic ' + btoa('1215012021' + ":" + '3AF54AAD-91E2-4285-AEE7-889363A576F2'));
      headers.append('username', '1215012021');
      headers.append('password', '3AF54AAD-91E2-4285-AEE7-889363A576F2');
      headers.append('TPsource', '1029');
    // const httpOptions = {
    //   headers: new HttpHeaders(
    //     {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Authorization': `Basic ` + btoa('1215012021:3AF54AAD-91E2-4285-AEE7-889363A576F2'),
    //       'access-control-allow-credentials': 'true'
    //     }
    //   )
    // };
    const params = new HttpParams().set('objPolicy', policyDetails).set('objVehicleDetails', vehicleDetails);
    return this.http.post(`${url}`, { header: headers, params: params })
    .pipe( map(response => response), catchError(this.handleError));
  }



  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}

}