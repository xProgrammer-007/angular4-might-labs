import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'overview', title: 'New Posts',  icon: 'dashboard', class: '' },
    { path: 'studentzone', title: 'Bright Education',  icon:'wc', class: '' },
    { path: 'community', title: 'Community',  icon:'language', class: '' },
    { path: 'about', title: 'About',  icon:'location_on', class: '' },
    { path: 'membersarea', title: 'Members Zone',  icon:'fingerprint', class: '' },
    { path: 'profile', title: 'My Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
     if ($(window).width() > 991) {
          return false;
      }
     return true;
  };
}
