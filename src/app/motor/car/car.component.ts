import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html'
})
export class CarComponent implements OnInit {
  carField : string = "Save upto 70% on your Car Insurance";
  motorType: String = "Car";
  constructor() { }
  ngOnInit(): void {
  }

}
