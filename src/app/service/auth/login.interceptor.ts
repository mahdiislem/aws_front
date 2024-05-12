import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== 'http://localhost:9001/api/login') {
    
      const token = localStorage.getItem('token');
      request = request.clone({
        setHeaders: { Authorization: `Bearer `+localStorage.getItem("token") }
    });
    }
      return next.handle(request);
  }
}
