import {Component, inject, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  imports: [
    JsonPipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title!: string;
  @Input() data!: any[];
  protected readonly activeModal = inject(NgbActiveModal);

  closeModal(result: boolean) {
    this.activeModal.close(result);
  }
}
