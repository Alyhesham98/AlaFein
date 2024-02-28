import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    public authenticationService: AuthService,
    private loaderService: LoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData) {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + userData.JWTToken,
        },
      });
      return next.handle(newRequest).pipe(
        catchError((error) => {
          if (
            error.error.Message ===
            'Your account is Blocked or Deleted. Please Contact admin@alafein.com.'
          ) {
            this.authenticationService.logout();
          }
          if (
            error instanceof HttpErrorResponse &&
            !newRequest.url.includes('login') &&
            error.status === 0
          ) {
            this.authenticationService.logout();
          }

          return throwError(error);
        }),
        finalize(() => {
          this.loaderService.hideWithDelay();
        })
      );
    } else {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer KjWN272CKWKwYYgZW`,
        },
      });
      return next.handle(newRequest).pipe(
        finalize(() => {
          if (event instanceof HttpResponse) {
            this.loaderService.hideWithDelay();
          }
        })
      );
    }
  }
}
