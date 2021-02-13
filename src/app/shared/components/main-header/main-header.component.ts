import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface HealthInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
} 
declare interface MotorInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: HealthInfo[] = [
  { path: '#', title: 'Individual', icon: 'far fa-handshake', class: '' },
  { path: '#', title: 'Family Floater Insurance', icon: 'library_books', class: '' },
  { path: '#', title: 'Corona viruse Special', icon: 'content_paste', class: '' }
];

export const ROUTES2: MotorInfo[] = [
  { path: 'motor-insurance/car-insurance', title: 'Car Insurance', icon: 'far fa-handshake', class: '' },
  { path: 'motor-insurance/two-wheeler-insurance', title: 'Two wheeler Insurance', icon: 'library_books', class: '' },
  { path: 'motor-insurance/third-party-insurance', title: 'Third Party Insurance', icon: 'content_paste', class: '' },
  { path: 'motor-insurance/taxi-insurance', title: 'Taxi Insurance', icon: 'bubble_chart', class: '' },
  { path: 'motor-insurance/commercial-vehicle-insurance', title: 'Commercial Vehical Insurance', icon: 'person', class: '' }
];

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html' 
})
export class MainHeaderComponent implements OnInit {
  healthMenuItems: any[];
  motorMenuItems: any[];
  constructor() { }

  ngOnInit(): void {
    this.healthMenuItems = ROUTES.filter(healthmenuItem => healthmenuItem);
    this.motorMenuItems = ROUTES2.filter(motorMenuItems => motorMenuItems);
  }

}
