import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-collection-card',
  imports: [
    TranslatePipe
  ],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss'
})
export class CollectionCardComponent {
  @Input() collection!: any;
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();

  protected delete(param: any) {
    this.deleteEvent.emit(param);
  }

  protected edit(param: any) {
    this.editEvent.emit(param);
  }
}
