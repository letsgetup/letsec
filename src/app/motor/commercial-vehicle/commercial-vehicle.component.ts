import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commercial-vehicle',
  templateUrl: './commercial-vehicle.component.html'
})
export class CommercialVehicleComponent implements OnInit {
  commercialField: string = "Save upto 70%* on your Taxi Insurance";
  motorType: string = "Commercial";
  
    constructor(){}
    
    ngOnInit(): void {
        
    }
    
}