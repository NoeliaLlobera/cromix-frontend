import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {EditCollectionService} from "../../services/edit-collection.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CreateCromoTypeModalComponent
} from "../../components/create-cromo-type-modal/create-cromo-type-modal.component";
import {HttpClient} from "@angular/common/http";
import {CROMO_TYPES_ENDPOINTS} from "../../../core/constants/api";
import {GrowlService} from "../../../core/services/growl.service";
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-edit-collection',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss'
})
export class EditCollectionComponent implements OnInit {
  private readonly service: EditCollectionService = inject(EditCollectionService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);
  private modalService: NgbModal = inject(NgbModal);
  private readonly growlService: GrowlService = inject(GrowlService);
  title: string;
  collectionData!: CollectionDTO;
  cromoTypeSignal: WritableSignal<CromoTypeDTO[]> = signal([]);

  constructor() {
    this.title = this.route.snapshot.title || '';
  }

  async ngOnInit() {
    const collection: CollectionDTO[] = await this.service.getCollectionById(this.route.snapshot.params['id']);
    this.collectionData = collection[0];
    this.cromoTypeSignal.set(await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']));
  }

  printPage() {
    window.open(`/#/printPage/${this.route.snapshot.params['id']}`, '_blank');
  }

  async addCromoType() {
    const modal = this.modalService.open(CreateCromoTypeModalComponent, {size: 'xl', centered: true});
    modal.componentInstance.family_id = this.route.snapshot.params['id'];
    modal.componentInstance.title = 'Crear nou cromo';
    modal.componentInstance.mode = 'create';
    modal.result.then((result) => {

      this.http.post(CROMO_TYPES_ENDPOINTS.CREATE, result).subscribe(async (res) => {
        this.growlService.setMessage('Cromo creat correctament.', 'success');
        this.cromoTypeSignal.set(await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']));
      });
    });
  }

  async modifyCromoType(cromoType: CromoTypeDTO) {
    const modal = this.modalService.open(CreateCromoTypeModalComponent, {size: 'xl', centered: true});
    modal.componentInstance.family_id = this.route.snapshot.params['id'];
    modal.componentInstance.cromoType = cromoType;
    modal.componentInstance.title = 'Modificar cromo';
    modal.componentInstance.mode = 'edit';
    modal.result.then((result) => {
      if (result !== 'delete') {
        this.http.patch(CROMO_TYPES_ENDPOINTS.UPDATE(cromoType.id), result).subscribe(async (res) => {
          this.growlService.setMessage('Cromo modificat correctament.', 'success');
          this.cromoTypeSignal.set(await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']));
        });
      } else {
        const confirmationModal = this.modalService.open(ConfirmationModalComponent, {size: 'sm', centered: true});
        confirmationModal.componentInstance.title = 'Eliminar cromo';
        confirmationModal.componentInstance.message = 'Estàs segur que vols eliminar aquest cromo? Aquesta acció no es pot desfer.';

        confirmationModal.result.then((result) => {
          if (result) {
            this.http.delete(CROMO_TYPES_ENDPOINTS.DELETE(cromoType.id)).subscribe(async (res) => {
              this.growlService.setMessage('Cromo eliminat correctament.', 'success');
              this.cromoTypeSignal.set(await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']));
            });
          }
        });
      }

    });
  }

  preview() {
    this.router.navigate([`/preview/${this.route.snapshot.params['id']}`]).then();
  }
}
