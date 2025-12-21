import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '../storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't attach tokens to auth endpoints
    const isAuthCall = req.url.endsWith('/login') || req.url.endsWith('/register');
    const token = this.storage.getItem('travlr-token');

    // Clone with Authorization header if we have a token and it's not an auth call
    const requestToSend = (!isAuthCall && token)
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(requestToSend).pipe(
      catchError(err => {
        // On unauthorized: clear token and send user to login
        if (err?.status === 401) {
          this.storage.removeItem('travlr-token');

          // Preserve where they were headed
          const returnUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
          this.router.navigate(['/login'], { queryParams: { returnUrl } });
        }
        return throwError(() => err);
      })
    );
  }
}
 