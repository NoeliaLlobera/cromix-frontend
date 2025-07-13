import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {HomeService} from "../../service/home.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CreateCollectionModalComponent
} from "../../components/create-collection-modal/create-collection-modal.component";
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {Store} from "@ngrx/store";
import {selectCollections, selectIsLoading} from "../../../store/collections/collections.selectors";
import {createCollection, deleteCollection, loadCollections} from "../../../store/collections/collections.actions";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  collections$!: Observable<CollectionDTO[]>;
  loader$!: Observable<boolean>;

  async ngOnInit() {
    this.store.dispatch(loadCollections());
    this.loader$ = this.store.select(selectIsLoading);
    this.collections$ = this.store.select(selectCollections);
  }

  async openModal() {
    const result =
      await this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true}).result;
    const user = JSON.parse(localStorage.getItem('user')!);

    const collection = {
      collection_name: result,
      creator_id: user.id
    }

    this.store.dispatch(createCollection({collection}));
  }


  edit(id: string) {
    this.router.navigate([`edit/${id}`]).then();
  }

  async delete(collection_id: string) {
    const modal = this.modalService.open(ConfirmationModalComponent, {size: 'md', centered: true});
    modal.componentInstance.title = `Eliminar col·lecció`;
    modal.componentInstance.message = `Estàs segur que vols eliminar aquesta col·lecció? Aquesta acció no es pot desfer.`;

    modal.result.then(async (result) => {
      if (result) {
        this.store.dispatch(deleteCollection({collection_id}));
      }
    });
  }
}
