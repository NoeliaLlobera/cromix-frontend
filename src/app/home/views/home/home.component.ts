import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
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
import {setGrowlMessage} from "../../../store/growl/growl.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly service: HomeService = inject(HomeService);
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  public collections: WritableSignal<CollectionDTO[]> = signal([]);
  loader: boolean = false;

  async ngOnInit() {
    try {
      this.loader = true;
      this.collections.set(await this.service.getCollections());
    } finally {
      this.loader = false;
    }
  }

  async openModal() {
    const result = await this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true}).result;

    const user = JSON.parse(localStorage.getItem('user')!);

    const collection = {
      collection_name: result,
      creator_id: user.id
    }

    try {
      this.loader = true;
      await this.service.postCollection(collection);
    } finally {
      this.loader = false;
    }
    this.collections.set(await this.service.getCollections());
  }


  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
  }

  async delete(collection_id: string) {
    const modal = this.modalService.open(ConfirmationModalComponent, {size: 'md', centered: true});
    modal.componentInstance.title = `Eliminar col·lecció`;
    modal.componentInstance.message = `Estàs segur que vols eliminar aquesta col·lecció? Aquesta acció no es pot desfer.`;

    modal.result.then(async (result) => {
      if (result) {
        try {
          this.loader = true;
          await this.service.deleteCollection(collection_id);
          this.store.dispatch(setGrowlMessage({
            growl: {
              message: 'Col·lecció eliminada correctament',
              type: 'success'
            }
          }));
          this.collections.set(await this.service.getCollections());
        } catch (err) {
          this.store.dispatch(setGrowlMessage({growl: {message: 'err', type: 'danger'}}));
        } finally {
          this.loader = false;
        }
      }
    });
  }
}
