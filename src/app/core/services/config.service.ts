import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  hasHeader: WritableSignal<boolean> = signal(true)
}
