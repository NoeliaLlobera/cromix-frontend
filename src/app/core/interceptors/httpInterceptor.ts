import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GrowlService } from '../services/growl.service';

export function HttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const store: Store = inject(Store);
  const growlService: GrowlService = inject(GrowlService);

  // TODO ADD PRODUCTION URL ALSO
  const protectedRoute = req.url.startsWith('');
  console.log('Protected route:', protectedRoute);
  const updatedReq = protectedRoute ? req.clone({withCredentials: true}) : req;

  // const user: any = localStorage.getItem('user');
  // let authReq = req;
  // if (user) {
  //   const authToken = JSON.parse(user).id;
  //   authReq = req.clone({
  //     setHeaders: { Authorization: authToken }
  //   });
  //

  return next(updatedReq).pipe(
    catchError(error => {
      console.log(error.error);
      let errorMessage = 'unknownError';

      if (error.error && error.error.code) {
        errorMessage = `common.errors.${error.error.code}`
      } else if(error.error.message) {
        errorMessage = error.error.message;
      }

      growlService.setGrowlMessage({ message: errorMessage, type: 'danger' });
      if (error.status === 404) {
        return throwError(() => error);
      } else {
        localStorage.removeItem('user');
        router.navigate(['login']).then();
        return throwError(() => error);
      }
    })
  );
}
