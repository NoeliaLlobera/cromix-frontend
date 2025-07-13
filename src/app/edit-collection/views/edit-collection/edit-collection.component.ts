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
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import {Store} from "@ngrx/store";
import {setGrowlMessage} from "../../../store/growl/growl.actions";
import {Observable} from "rxjs";
import {selectCollectionInfo, selectCromoTupes, selectIsCromosLoading} from "../../../store/cromos/cromos.selectors";
import {
  createCromo,
  deleteCromo,
  getCollectionInfo,
  getCromos,
  updateCromo
} from "../../../store/cromos/cromos.actions";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-edit-collection',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    LoaderComponent,
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
  private readonly store: Store = inject(Store);
  title: string;
  collection$!: Observable<CollectionDTO>;
  cromoType$!: Observable<CromoTypeDTO[]>;
  loader$!: Observable<boolean>;

  constructor() {
    this.title = this.route.snapshot.title || '';
  }

  async ngOnInit() {
    const collectionId = this.route.snapshot.params['id'];

    this.store.dispatch(getCollectionInfo({collection_id: collectionId}));
    this.store.dispatch(getCromos({collection_id: collectionId}));

    this.loader$ = this.store.select(selectIsCromosLoading);
    this.collection$ = this.store.select(selectCollectionInfo);
    this.cromoType$ = this.store.select(selectCromoTupes);
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
      this.store.dispatch(createCromo({cromo: {...result}}));
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
        this.store.dispatch(updateCromo({cromo: {...cromoType, ...result}}));
      } else {
        const confirmationModal = this.modalService.open(ConfirmationModalComponent, {size: 'sm', centered: true});
        confirmationModal.componentInstance.title = 'Eliminar cromo';
        confirmationModal.componentInstance.message = 'Estàs segur que vols eliminar aquest cromo? Aquesta acció no es pot desfer.';

        confirmationModal.result.then((result) => {
          if (result) {
            this.store.dispatch(deleteCromo({cromo_id: cromoType.id}));
          }
        });
      }

    });
  }

  preview() {
    this.router.navigate([`/preview/${this.route.snapshot.params['id']}`]).then();
  }
}
