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
      if (this.userData) {
        this.router.navigate(['home']);
        return false;
      }
    }
    return true;
  }
}
