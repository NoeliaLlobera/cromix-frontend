import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UserDTO} from "../models/UserDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Subject<UserDTO | null> = new Subject<UserDTO | null>();
  private readonly router: Router = inject(Router);

  constructor() {
  }

  startSession() {
    const storedUser: string | null = localStorage.getItem('user');
    if (storedUser) {
      const user: UserDTO = JSON.parse(storedUser);
      if (user) this._user.next(user);
    }
  }

  user$(): Observable<UserDTO | null> {
    return this._user.asObservable();
  }

  setUser(user: UserDTO | null) {
    this._user.next(user);
  }

  logout() {
    localStorage.removeItem('user')
    this.setUser(null);
    this.router.navigate(['/']).then();
  }

}
