import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GrowlService} from '../services/growl.service';

function removeNulls(obj: any): any {
    if (obj == null) return obj;
    if (Array.isArray(obj)) {
        return obj.filter((v) => v != null).map((v) => removeNulls(v));
    }
    if (typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([, v]) => v != null)
                .map(([k, v]) => [k, removeNulls(v)])
        );
    }
    return obj;
}


export function HttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const router = inject(Router);
    const growlService: GrowlService = inject(GrowlService);

    // TODO ADD PRODUCTION URL ALSO
    const protectedRoute = req.url.startsWith('');
    console.log('Protected route:', protectedRoute);
    let updatedReq = protectedRoute ? req.clone({withCredentials: true}) : req;

    const sanitizedBody = removeNulls(updatedReq.body);
    if (sanitizedBody !== updatedReq.body) {
        updatedReq = updatedReq.clone({ body: sanitizedBody });
    }

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
            } else if (error.error.message) {
                errorMessage = error.error.message;
            }

            growlService.setGrowlMessage({message: errorMessage, type: 'danger'});
            const status = error.status;
            const isAuthError = status === 401 || status === 403;

            if (isAuthError) {
                localStorage.removeItem('user');
                router.navigate(['login']).then();
            }

            return throwError(() => error);
        })
    );
}
