import {Component, inject} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-collection-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './create-collection-modal.component.html',
  styleUrl: './create-collection-modal.component.scss'
})
export class CreateCollectionModalComponent {
  activeModal = inject(NgbActiveModal);
  control = new FormControl('', [Validators.required]);


  save() {
    if (this.control.valid) {
      this.activeModal.close(this.control.value);
    }
  }

  dismiss() {
    this.activeModal.close(null);
  }
}
