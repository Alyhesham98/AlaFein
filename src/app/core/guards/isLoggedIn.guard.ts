import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard {
  userData: any;

  constructor(public authService: AuthService, public router: Router) {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.getToken() != null) {
      if (this.userData.Role == 'Admin') {
        this.router.navigate(['admin/dashboard']);
        return false;
      } else if (this.userData.Role == 'Facility') {
        this.router.navigate(['facility/dashboard']);
        return false;
      } else if (this.userData.Role == 'Doctor') {
        this.router.navigate(['doctor/dashboard']);
        return false;
      }
    }
    return true;
  }
}
