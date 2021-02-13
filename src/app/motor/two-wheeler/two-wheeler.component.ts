import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-wheeler',
  templateUrl: './two-wheeler.component.html'
})
export class TwoWheelerComponent implements OnInit {
  twoWheller: string = "Save upto 70%* on your Two Wheeler Insurance";
  motorType: string = "2W";
  constructor() { }

  ngOnInit(): void {
  }

}
