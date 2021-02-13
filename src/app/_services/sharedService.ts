import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class LtsSharedService {

    //httpstatus
    httpStatus = new BehaviorSubject<boolean>(true);
    vehicleData = new BehaviorSubject<any>([]);
    insurancePlan = new BehaviorSubject<any>([]);

    setHttpStatus(status: boolean) {
        this.httpStatus.next(status);
    }

    getHttpStatus(): Observable<boolean> {
       return this.httpStatus.asObservable();
    }

    setVehicleData(obj: any) {
        this.vehicleData.next(obj);
    }

    getVehicleData(): Observable<any> {
        return this.vehicleData.asObservable();
    }

    setInsurancePlan(obj: any){
        this.insurancePlan.next(obj);
    }

    getInsurancePlan(): Observable<any> {
        return this.insurancePlan.asObservable();
    }

}