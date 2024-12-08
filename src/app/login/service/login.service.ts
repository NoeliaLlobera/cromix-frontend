import {inject, Injectable} from '@angular/core';
import {IloginModel} from "../models/login.model";
import {HttpClient} from "@angular/common/http";
import {USERS_ENDPOINTS} from "../../core/constants/api";
import {lastValueFrom} from "rxjs";
import {GrowlService} from "../../core/services/growl.service";
import {AuthService} from "../../core/services/auth.service";
import {UserDTO} from "../../core/models/UserDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly growlService: GrowlService = inject(GrowlService)
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  constructor() { }

  async signup(loginData: IloginModel): Promise<void> {
    try {
      const response = await lastValueFrom(this.http.post(USERS_ENDPOINTS.CREATE, loginData));
      this.growlService.setMessage('login.success', 'success');
      this.router.navigate(['/home']).then();
    } catch (err: any){
      this.growlService.setMessage(`common.errors.${err.error.error}`, 'danger');
    }
  }

  async login(loginData: IloginModel): Promise<void>{
    try {
      const response: UserDTO = <UserDTO>await lastValueFrom(this.http.post(USERS_ENDPOINTS.LOGIN, loginData));
      localStorage.setItem('user', JSON.stringify(response));
      this.authService.setUser(response);
      this.router.navigate(['/home']).then();
    } catch (err: any){
      this.growlService.setMessage(`common.errors.${err.error.code}`, 'danger');
    }
  }

}
