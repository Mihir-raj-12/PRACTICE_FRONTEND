import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // We get the token from our service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1. Get the token from our AuthService
    const token = this.authService.getToken();

    // 2. If a token exists, clone the request and add the auth header
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // 3. Pass the new, cloned request to the next handler
      return next.handle(clonedRequest);
    }

    // 4. If no token, just pass the original request
    return next.handle(request);
  }
}