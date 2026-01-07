import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";
import { CollectionDTO } from "../../../core/models/collectionDTO";
import { CromoTypeDTO } from "../../../core/models/cromo-typeDTO";
import { GrowlService } from '../../../core/services/growl.service';
import { ConfirmationModalComponent } from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import {
  CreateCromoTypeModalComponent
} from "../../components/create-cromo-type-modal/create-cromo-type-modal.component";
import { EditCollectionService } from "../../services/edit-collection.service";
import {JsonPipe} from "@angular/common";
import {
  CreateCollectionModalComponent
} from "../../../home/components/create-collection-modal/create-collection-modal.component";

@Component({
  selector: 'app-edit-collection',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    RouterLink,
    LoaderComponent,
    JsonPipe,
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss'
})
export class EditCollectionComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly modalService: NgbModal = inject(NgbModal);
  private readonly service: EditCollectionService = inject(EditCollectionService);
  private readonly growlService: GrowlService = inject(GrowlService);

  title: string;
  collection!: CollectionDTO;
  cromoTypes: CromoTypeDTO[] = [];
  isLoading = false;
  collectionId!: string;

  constructor() {
    this.title = this.route.snapshot.title || '';
  }

  async ngOnInit() {
    this.collectionId = this.route.snapshot.params['id'];
    this.isLoading = true;

    try {
      this.collection = await this.service.getCollectionInfo(this.collectionId);
      this.cromoTypes = await this.service.getCromos(this.collectionId);
    } finally {
      this.isLoading = false;
    }
  }

  printPage() {
    window.open(`/#/printPage/${this.collectionId}`, '_blank');
  }

  async addCromoType() {
    const modal = this.modalService.open(CreateCromoTypeModalComponent, { size: 'xl', centered: true });
    modal.componentInstance.family_id = this.collectionId;
    modal.componentInstance.title = 'Crear nou cromo';
    modal.componentInstance.mode = 'create';

    try {
      const result = await modal.result;
      this.cromoTypes = await this.service.createCromo({ ...result, collection_id: this.collectionId });
    } catch {
      // Modal dismissed
    }
  }

  async modifyCromoType(cromoType: CromoTypeDTO) {
    console.log(cromoType);
    const modal = this.modalService.open(CreateCromoTypeModalComponent, { size: 'xl', centered: true });
    modal.componentInstance.family_id = this.collectionId;
    modal.componentInstance.cromoType = cromoType;
    modal.componentInstance.title = 'Modificar cromo';
    modal.componentInstance.mode = 'edit';

    try {
      const result = await modal.result;

      if (result !== 'delete') {
        this.cromoTypes = await this.service.updateCromo({ ...cromoType, ...result });
      } else {
        await this.handleDeleteCromo(cromoType);
      }
    } catch {
      // Modal dismissed
    }
  }

  private async handleDeleteCromo(cromoType: CromoTypeDTO) {
    const confirmationModal = this.modalService.open(ConfirmationModalComponent, { size: 'sm', centered: true });
    confirmationModal.componentInstance.title = 'Eliminar cromo';
    confirmationModal.componentInstance.message = 'Estàs segur que vols eliminar aquest cromo? Aquesta acció no es pot desfer.';

    try {
      const confirmed = await confirmationModal.result;
      if (confirmed) {
        this.cromoTypes = await this.service.deleteCromo(cromoType.id, this.collectionId);
      }
    } catch {
      // Modal dismissed
    }
  }

  preview() {
    this.router.navigate([`/preview/${this.collectionId}`]).then();
  }

  async openCollectionConfig(data: CollectionDTO) {
    const modal =
      await this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true });
    modal.componentInstance.data = data;
    const result = await modal.result;
    const user = JSON.parse(localStorage.getItem('user')!);
    const collection = {
      ...result,
      creator_id: user.id,
      size: this.collection.total_cromos
    }
    this.collection = await this.service.updateCollection({...this.collection, ...collection});
  }
}
