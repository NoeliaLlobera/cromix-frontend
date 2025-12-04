import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import html2canvas from "html2canvas";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";

@Component({
  selector: 'app-create-collection-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-cromo-type-modal.component.html',
  styleUrl: './create-cromo-type-modal.component.scss'
})
export class CreateCromoTypeModalComponent implements OnInit {
  @Input() collection_id!: string;
  @Input() cromoType!: CromoTypeDTO;
  @Input() title!: string;
  @Input() mode!: 'create' | 'edit';
  protected readonly activeModal = inject(NgbActiveModal);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  form!: FormGroup
  imgString: any;
  cromoImgString: any;
  previewImage: {image: string, title: string} | null = null;


  ngOnInit(): void {
    console.log(this.cromoType);
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(undefined, [Validators.required]),
      collection_id: new FormControl(`${this.collection_id}`, [Validators.required])
    });

    console.log(this.mode);
    if(this.mode === 'edit'){
      console.log(this.cromoType);
      this.form.patchValue(this.cromoType);
      this.form.get('image')?.setValue(this.cromoType.base_image);
      this.generatePrevisualization();
    }
  }

  validateAndTransformFile(event: any): void {
    const fileInput = event.target;
    const file: File = fileInput.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Selecciona un fitxer imatge.');
        fileInput.value = ''; // Clear the file input
        this.form.controls['image'].setValue('');
        return;
      }
      if (file.size > 1048576) { // 1MB in bytes
        alert('El fitxer no pot superar 1MB.');
        fileInput.value = ''; // Clear the file input
        this.form.controls['image'].setValue('');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imgString = reader.result;
      };
      reader.onloadend = () => {
        this.form.get('image')?.setValue(this.imgString);
      }
      reader.readAsDataURL(file);
    };
  }


  generatePrevisualization() {
    this.form.disable();
    console.log(this.form.value);
    this.previewImage = {image: this.form.value.image, title: this.form.value.name};
  }

  saveCromo() {
    const element = document.getElementById('preview');
    if(!this.imgString){
      this.imgString = this.cromoType.base_image;
    };
    if (element) {
      html2canvas(element).then(canvas => {
        document.body.appendChild(canvas)
        this.cromoImgString = canvas.toDataURL('image/png');
        this.activeModal.close({
          name: this.form.value.name,
          image: this.cromoImgString,
          base_image: this.imgString,
          collection_id: this.form.value.collection_id,
        });
      });
    }

  }

  resetPreview() {
    this.form.enable();
    this.previewImage = null;
  }

  delete() {
    this.activeModal.close('delete');
  }
}
