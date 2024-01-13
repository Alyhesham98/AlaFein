import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://backend.rep-trust.com/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + 'Auth/Login', data, httpOptions)
      .pipe(tap((result: any) => this.save_token(result)));
  }

  public logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  verifyEmail(data: any): Observable<any> {
    return this.http.post<any>(
      this.url + 'Auth/VerifyEmail',
      data,
      httpOptions
    );
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('userData');
    return token != null && token.length > 0;
  }

  public save_token(data: any) {
    this.userData = data.Data;
    if (data.Succeeded) {
      window.localStorage.setItem('userData', this.userData);
    }
  }

  public getToken(): string | null {
    let token = JSON.parse(localStorage.getItem('userData') ?? '{}');
    return this.isLoggedIn() ? token.JWTToken : null;
  }
}
