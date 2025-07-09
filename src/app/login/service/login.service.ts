import {inject, Injectable} from '@angular/core';
import {IloginModel} from "../models/login.model";
import {HttpClient} from "@angular/common/http";
import {USERS_ENDPOINTS} from "../../core/constants/api";
import {lastValueFrom} from "rxjs";
import {AuthService} from "../../core/services/auth.service";
import {UserDTO} from "../../core/models/UserDTO";
import {Router} from "@angular/router";
import {setGrowlMessage} from "../../store/growl/growl.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);

  constructor() { }

  async signup(loginData: IloginModel): Promise<void> {
    try {
      const response = await lastValueFrom(this.http.post(USERS_ENDPOINTS.CREATE, loginData));
      this.store.dispatch(setGrowlMessage({growl: {message: 'login.success.', type: 'success'}}));
      this.router.navigate(['']).then();
    } catch (err: any){
      this.store.dispatch(setGrowlMessage({growl: {message: `common.errors.${err.error.error}`, type: 'danger'}}));
    }
  }

  async login(loginData: IloginModel): Promise<void>{
    try {
      const response: UserDTO = <UserDTO>await lastValueFrom(this.http.post(USERS_ENDPOINTS.LOGIN, loginData));
      localStorage.setItem('user', JSON.stringify(response));
      this.authService.setUser(response);
      this.router.navigate(['/home']).then();
    } catch (err: any){
      this.store.dispatch(setGrowlMessage({growl: {message: `common.errors.${err.error.code}`, type: 'danger'}}));
    }
  }

}
