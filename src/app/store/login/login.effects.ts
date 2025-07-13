import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LoginService} from "../../login/service/login.service";
import {exhaustMap, map, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {logout} from "./login.actions";

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private service = inject(LoginService);
  private readonly router: Router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Login Page] Login'),
      exhaustMap((loginData) => this.service.login(loginData.user)
        .pipe(
          tap((login: any) => {
            console.log(login);
            localStorage.setItem('user', JSON.stringify(login));
            this.router.navigate(['/home']).then();
          }),
          map(login => {
            return {type: '[Login Page] Login Success', user: login}
          }),
          catchError(error => of({type: '[Login Page] Login Failed', error: error.error.code}))
        ))
    );
  });


  logoutRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('user')
          this.router.navigate(['/login']).then();
        })
      ),
    {dispatch: false}
  );

}
