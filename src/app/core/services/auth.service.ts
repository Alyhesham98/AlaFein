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
  private url = 'https://alafein.azurewebsites.net/api/v1/';
  private userData!: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + 'AdminAccount/Login', data, httpOptions)
      .pipe(tap((result: any) => this.save_token(result)));
  }

  public logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('userData');
    return token != null && token.length > 0;
  }

  public save_token(data: any) {
    this.userData = JSON.stringify({
      JWTToken: data.Data.JWTToken,
      refreshToken: data.Data.RefreshToken,
      user: data.Data
    });
    if (data.Succeeded) {
      window.localStorage.setItem('userData', this.userData);
    }
  }

  public getToken(): string | null {
    let token = JSON.parse(localStorage.getItem('userData') ?? '{}');
    return this.isLoggedIn() ? token.JWTToken : null;
  }

  public refreshToken(): Observable<any> {
    const tokenData = JSON.parse(localStorage.getItem('userData') ?? '{}');
    return this.http.post<any>(`${this.url}AdminAccount/RefreshToken`, {
      refreshToken: tokenData.refreshToken
    }, httpOptions).pipe(tap(response => {
      if (response && response.Data && response.Data.JWTToken) {
        tokenData.JWTToken = response.Data.JWTToken;
        tokenData.refreshToken = response.Data.RefreshToken; // Update refresh token if returned
        localStorage.setItem('userData', JSON.stringify(tokenData));
      }
    }));
  }
}
