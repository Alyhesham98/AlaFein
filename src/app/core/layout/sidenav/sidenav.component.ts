import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  userData: any;
  isSidebarActive = false;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    
  }
}
