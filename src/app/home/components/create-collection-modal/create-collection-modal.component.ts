import {Component, inject, OnInit, OnDestroy, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {CollectionDTO} from "../../../core/models/collectionDTO";

@Component({
  selector: 'app-create-collection-modal',
  imports: [TranslatePipe, ReactiveFormsModule, NgIf],
  templateUrl: './create-collection-modal.component.html',
  styleUrl: './create-collection-modal.component.scss'
})
export class CreateCollectionModalComponent implements OnInit, OnDestroy {

  @Input() data!: CollectionDTO;
  activeModal = inject(NgbActiveModal);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  form = this.fb.group({
    collection_name: this.fb.control<string>('', { validators: [Validators.required] }),
    mode: this.fb.control<'digital' | 'print' | null>(null, { validators: [Validators.required] }),
    cards_per_pack: this.fb.control<number | null>(null),
    periodicity: this.fb.control<number | null>(null),
    bonus: this.fb.control<string | null>(null),
    allow_print: this.fb.control<boolean>(false)
  });

  ngOnInit() {
    const modeCtrl = this.form.get('mode');
    modeCtrl?.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(mode => {
        const cards = this.form.get('cards_per_pack');
        const periodicity = this.form.get('periodicity');
        const bonus = this.form.get('bonus');
        if (mode === 'digital') {
          cards?.setValidators([Validators.required, Validators.min(1)]);
          periodicity?.setValidators([Validators.required, Validators.min(1)]);
          bonus?.setValidators([Validators.required]);
        } else {
          cards?.clearValidators();
          periodicity?.clearValidators();
          bonus?.clearValidators();
        }
        cards?.updateValueAndValidity({emitEvent: false});
        periodicity?.updateValueAndValidity({emitEvent: false});
        bonus?.updateValueAndValidity({emitEvent: false});
      });

    if(this.data){
      this.form.patchValue({
        collection_name: this.data.collection_name,
        mode: this.data.mode,
        cards_per_pack: this.data.cards_per_pack,
        periodicity: this.data.periodicity,
        bonus: this.data.bonus ? this.data.bonus.join(', ') : null,
        allow_print: this.data.allow_print || true
      });
    }
  }

  save() {
    const result: any = this.form.value;
    const bonus: any[] = [];
    result.bonus?.split(',').forEach((b: string) => {
      const trimmed = b.trim();
      if (trimmed) {
        const num = Number(trimmed);
        if (!isNaN(num) && num > 0) {
          bonus.push(num);
        }
      }
    });
    result.bonus = bonus;
    if (this.form.valid) {
      this.activeModal.close(result);
    }
  }

  dismiss() {
    this.activeModal.close(null);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
