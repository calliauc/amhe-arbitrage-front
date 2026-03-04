import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.sevice';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);


  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    const secureRequest = req.clone({ headers });
    return next.handle(secureRequest);
  }
}
