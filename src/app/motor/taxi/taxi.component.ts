import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html'
})
export class TaxiComponent implements OnInit {
  taxiField: string = "Save upto 70%* on your Taxi Insurance";
  motorType: string = "Taxi";
    constructor(){}
    
    ngOnInit(): void {
        
    }
    
}