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
  setUser(user: { token: string; user: UserDTO } | null): void {
    this._user.next(user?.user || null);
  }

  async loginAction(loginData: IloginModel) {
    const login: { token: string; user: UserDTO } = await this.login(loginData);
    localStorage.setItem('access_token', login.token);
    localStorage.setItem('user', JSON.stringify(login.user));
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

  login(loginData: IloginModel): Promise<{ token: string, user: UserDTO }> {
    return firstValueFrom(this.http.post<{ token: string, user: UserDTO }>(USERS_ENDPOINTS.LOGIN, loginData));
  }

  async logout() {
    await firstValueFrom(this.http.post(USERS_ENDPOINTS.LOGOUT, {}));
    this.setUser(null);
    await this.router.navigateByUrl('/login');
  }
}
