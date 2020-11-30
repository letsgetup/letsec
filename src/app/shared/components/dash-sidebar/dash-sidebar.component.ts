import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'welcome', title: 'Welcome',  icon:'person', class: '' },
    { path: 'insureance', title: 'Insureance',  icon:'library_books', class: '' },
    { path: 'leads', title: 'My Leads',  icon:'content_paste', class: '' },
    { path: 'booking', title: 'Booking',  icon:'bubble_chart', class: '' },
    { path: 'profile-view', title: 'User Profile',  icon:'person', class: '' }
];


@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html'
})
export class DashSidebarComponent implements OnInit {
  menuItems: any[];
  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
