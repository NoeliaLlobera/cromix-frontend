import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GrowlService {
  private _message$ = new Subject<string>();
  private _messageType$ = new Subject<'danger' | 'success' | 'warning'>();
  growlType: 'danger' | 'success' | 'warning' = 'success';

  get message$(): Observable<string> {
    return this._message$.asObservable();
  }

  get messageType$(): Observable<'danger' | 'success' | 'warning'> {
    return this._messageType$.asObservable();
  }

  setMessage(message: string, type: 'danger' | 'success' | 'warning') {
    this._message$.next(message);
    this._messageType$.next(type);
  }
}
