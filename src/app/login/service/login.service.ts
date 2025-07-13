import {inject, Injectable} from '@angular/core';
import {IloginModel} from "../models/login.model";
import {HttpClient} from "@angular/common/http";
import {USERS_ENDPOINTS} from "../../core/constants/api";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);

  constructor() {
  }

  // async signup(loginData: IloginModel): Promise<void> {
  //   try {
  //     const response = await lastValueFrom(this.http.post(USERS_ENDPOINTS.CREATE, loginData));
  //     this.store.dispatch(setGrowlMessage({growl: {message: 'login.success.', type: 'success'}}));
  //     this.router.navigate(['']).then();
  //   } catch (err: any) {
  //     this.store.dispatch(setGrowlMessage({growl: {message: `common.errors.${err.error.error}`, type: 'danger'}}));
  //   }
  // }

  signup(loginData: IloginModel): Observable<IloginModel> {
    return this.http.post<IloginModel>(USERS_ENDPOINTS.CREATE, loginData);
  }

  login(loginData: IloginModel): Observable<IloginModel> {
    return this.http.post<IloginModel>(USERS_ENDPOINTS.LOGIN, loginData);
  }

}
