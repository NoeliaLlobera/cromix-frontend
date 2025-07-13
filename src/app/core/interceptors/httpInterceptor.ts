import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {setGrowlMessage} from "../../store/growl/growl.actions";
import {Store} from "@ngrx/store";

export function HttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const store: Store = inject(Store);
  const user: any = localStorage.getItem('user');
  let authReq = req;
  if (user) {
    const authToken = JSON.parse(user).id;
    authReq = req.clone({
      setHeaders: {Authorization: authToken}
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      store.dispatch(setGrowlMessage({growl: {message: `common.errors.${error.error.code}`, type: 'danger'}}));
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
