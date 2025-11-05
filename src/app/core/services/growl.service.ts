import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GrowlModel } from '../models/growl';


@Injectable({
  providedIn: 'root'
})
export class GrowlService {
  private _Growl: Subject<GrowlModel> = new Subject<GrowlModel>();

  get growlMessages$(): Observable<GrowlModel> {
    return this._Growl.asObservable();
  }

  setGrowlMessage(growl: GrowlModel) {
    console.log(growl);
    this._Growl.next(growl);
  }
}
