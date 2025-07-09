import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const user = localStorage.getItem('user');
  let authReq = req;

  if (user) {
    const authToken = JSON.parse(user).id;
    authReq = req.clone({
      setHeaders: { Authorization: authToken }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      console.log(error.statusText);
      router.navigate(['login']).then();
      return throwError(() => error);
    })
  );
}
