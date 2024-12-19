import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-collection-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './create-cromo-type-modal.component.html',
  styleUrl: './create-cromo-type-modal.component.scss'
})
export class CreateCromoTypeModalComponent implements OnInit {
  protected readonly activeModal = inject(NgbActiveModal);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  form!: FormGroup
  @Input() family_id!: string;
  imgString: any;


  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(undefined, [Validators.required]),
      collectionId: new FormControl(`${this.family_id}`, [Validators.required])
    });
  }

  validateAndTransformFile(event: any): void {
    const fileInput = event.target;
    const file: File = fileInput.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        fileInput.value = ''; // Clear the file input
        this.form.controls['image'].setValue('');
        return;
      }
      if (file.size > 1048576) { // 1MB in bytes
        alert('The file size must be less than 1MB.');
        fileInput.value = ''; // Clear the file input
        this.form.controls['image'].setValue('');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imgString = reader.result;
      };
      reader.onloadend = () => {
        const img = String(this.imgString);
        this.form.get('image')?.setValue(this.imgString);
      }
      reader.readAsDataURL(file);
    };
  }


  save() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    }
  }

  dismiss() {
    this.activeModal.close(null);
  }

  generatePrevisualization() {
    console.log(this.form.value);
  }
}
