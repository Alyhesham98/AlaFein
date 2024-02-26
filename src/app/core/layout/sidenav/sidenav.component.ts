import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  userData: any;
  isSidebarActive = false;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
    console.log(this.userData);
    
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive; 
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }
}
