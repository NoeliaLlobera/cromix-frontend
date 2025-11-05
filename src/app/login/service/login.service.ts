import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {USERS_ENDPOINTS} from "../../core/constants/api";
import {IloginModel} from "../models/login.model";
import {GrowlService} from './../../core/services/growl.service';
import {UserDTO} from "../../core/models/UserDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly growlService: GrowlService = inject(GrowlService);
  private readonly router: Router = inject(Router);
  private _user: BehaviorSubject<UserDTO | null> = new BehaviorSubject<UserDTO | null>(null);

  constructor() {
    const user = localStorage.getItem('user');

    if(user){
      this.setUser(JSON.parse(user));
    }
  }

  get user$(): Observable<UserDTO | null> {
    return this._user.asObservable();
  };
  setUser(user: UserDTO | null): void {
    this._user.next(user);
  }

  async loginAction(loginData: IloginModel) {
    const login = await this.login(loginData);
    localStorage.setItem('user', JSON.stringify(login));
    this.setUser(login);
    this.growlService.setGrowlMessage({ message: 'login.success', type: 'success' });

    return login;
  }

  async signupAction(loginData: IloginModel): Promise<void> {
    try {
      await this.signup(loginData);
      await this.loginAction(loginData);
    } catch (error) {
      console.warn('Signup failed', error);
    }
  }


  signup(loginData: IloginModel): Promise<IloginModel> {
    return firstValueFrom(this.http.post<IloginModel>(USERS_ENDPOINTS.CREATE, loginData));
  }

  login(loginData: IloginModel): Promise<UserDTO> {
    return firstValueFrom(this.http.post<UserDTO>(USERS_ENDPOINTS.LOGIN, loginData));
  }

  async logout() {
    await firstValueFrom(this.http.post(USERS_ENDPOINTS.LOGOUT, {}));
    await this.router.navigateByUrl('/login');
  }
}
