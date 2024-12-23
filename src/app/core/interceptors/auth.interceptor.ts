// src/app/core/interceptors/auth.interceptor.ts
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptorr implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('aquí');
    if (localStorage.getItem('user')) {
      const storedUser = JSON.parse(String(localStorage.getItem('user')));
      const authToken = storedUser.id;

      const authReq = req.clone({
        setHeaders: {
          Authorization: String(authToken)
        }
      });

      return next.handle(authReq);
    } else {

      return next.handle(req);
    }
  }
}


export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('aquí');

  if (localStorage.getItem('user')) {
  const storedUser = JSON.parse(String(localStorage.getItem('user')));
  const authToken = storedUser.id;
  console.log(authToken);

  const authReq = req.clone({
    setHeaders: {
      Authorization: authToken
    }
  });
  return next(authReq);
} else {

  return next(req);
}
}
