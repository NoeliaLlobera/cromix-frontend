import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-collection-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './create-collection-modal.component.html',
  styleUrl: './create-collection-modal.component.scss'
})
export class CreateCollectionModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    collection_name: ['', Validators.required],
    creator_id: ['', Validators.required],
    mode: ['digital', Validators.required], // 'digital' | 'print'
    size: [0],
    cards_per_pack: [null],
    periodicity: [null],
    bonus: [null],
    allow_print: [false]
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      if (value.mode === 'print') {
        this.form.get('cards_per_pack')?.setValidators([Validators.required, Validators.min(1)]);
        this.form.get('periodicity')?.setValidators([Validators.required, Validators.min(1)]);
        this.form.get('bonus')?.setValidators([Validators.required]);
      } else {
        this.form.get('cards_per_pack')?.clearValidators();
        this.form.get('periodicity')?.clearValidators();
        this.form.get('bonus')?.clearValidators();
      }
      this.form.get('cards_per_pack')?.updateValueAndValidity();
      this.form.get('periodicity')?.updateValueAndValidity();
      this.form.get('bonus')?.updateValueAndValidity();
    });
  }

  save() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    }
  }

  dismiss() {
    this.activeModal.close(null);
  }
}
