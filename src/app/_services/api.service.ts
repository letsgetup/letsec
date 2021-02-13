import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { error } from "protractor";

@Injectable({
    providedIn: 'root'
})
export class APIService{

    constructor(private httpclient: HttpClient){

    }

    get(url: string, httpParams?: HttpParams): Observable<any> {
        return this.httpclient.get(url).pipe(catchError(erro => this.handleError(error)));
    }

    getWithType<T>(url: string, httpParams?: HttpParams): Observable<any> {
        return this.httpclient.get(url).pipe(catchError(erro => this.handleError(error)));
    }

    post(url:string, body: Object): Observable<any> {
        return this.httpclient.post(url, body).pipe(catchError(erro => this.handleError(error)));
    }

    postWithType<T>(url:string, body: Object): Observable<any> {
        return this.httpclient.post(url, body).pipe(catchError(erro => this.handleError(error)));
    }

    put(url:string, body: Object): Observable<any> {
        return this.httpclient.put(url, body).pipe(catchError(erro => this.handleError(error)));
    }

    delete(url:string): Observable<any> {
        return this.httpclient.delete(url).pipe(catchError(erro => this.handleError(error)));;
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
        window.alert(errorMessage);
        return throwError(errorMessage);
      }

}