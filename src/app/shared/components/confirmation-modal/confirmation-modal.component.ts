import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmation-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancel·lar';
  protected readonly activeModal = inject(NgbActiveModal);

  closeModal(result: boolean) {
    this.activeModal.close(result);
  }
}
