import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService, LtsSharedService } from '@app/_services';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { catchError, delay, finalize, map, retry } from 'rxjs/operators';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private totalRequest: number = 0;

    constructor(private accountService: AccountService, 
      private sharedService: LtsSharedService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        this.totalRequest++;
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            //  request.headers.append('access-control-allow-credentials', 'true')
            //        .append('Content-Type', 'application/json; charset=utf8')
            //        .append('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Accept')
            //        .append('Access-Control-Allow-Origin', '*');

        }
        
       
        return next.handle(request).pipe(map(event => {return event;}), 
          catchError(error => { if(error instanceof HttpErrorResponse){
            this.handleError(error);
          } 
          return throwError(error);
        }), finalize(()=>{ 
          this.totalRequest--;
          if(this.totalRequest === 0){
            this.sharedService.setHttpStatus(true);
          }
         }));
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