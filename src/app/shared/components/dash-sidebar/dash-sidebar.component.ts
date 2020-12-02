import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'welcome', title: 'Welcome',  icon:'far fa-handshake', class: 'far fa-handshake' },
    { path: 'insureance', title: 'Insurance',  icon:'library_books', class: 'fas fa-umbrella' },
    { path: 'leads', title: 'My Leads',  icon:'content_paste', class: 'fas fa-user-friends' },
    { path: 'booking', title: 'Booking',  icon:'bubble_chart', class: 'fas fa-clipboard-list' },
    { path: 'profile-view', title: 'User Profile',  icon:'person', class: 'fas fa-user' }
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
