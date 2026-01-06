import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {CollectorListService} from "./services/collector-list.service";
import {JsonPipe} from "@angular/common";
import {CollectionCardComponent} from "../shared/components/collection-card/collection-card.component";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CardListSkeletonComponent} from "../shared/skeletons/card-list-skeleton/card-list-skeleton.component";

@Component({
  selector: 'app-collector-list',
  imports: [FormsModule, FormsModule, TranslatePipe, JsonPipe, CollectionCardComponent, CardListSkeletonComponent],
  templateUrl: './collector-list.component.html',
  styleUrl: './collector-list.component.scss'
})
export class CollectorListComponent implements OnInit {
  protected searchControl: any;
  private modalService: NgbModal = inject(NgbModal);

  private readonly service: CollectorListService = inject(CollectorListService);
  protected collectionsList: any[] = [];
  protected collectionsSubscribed: any[] = [];
  protected loaded: boolean = false;

  ngOnInit() {
    this.getCollections().then();
  }

  protected async onSearch() {
    const result = await this.service.getCollections(this.searchControl || '');
    let filtered = [];

    for (let collection of result) {
      if (!this.collectionsSubscribed.find(c => c.collection_id === collection.collection_id)) {
        filtered.push(collection);
      }
    }
    this.collectionsList = filtered;
  }

  protected async subscribe(collection_id: any) {
    this.collectionsList = [];
    await this.service.subscribeToCollection(collection_id);
    await this.getCollections();
  }

  async getCollections() {
    this.loaded = false;
    this.collectionsSubscribed = await this.service.getUserCollections();
    this.loaded = true;
  }

  async onDelete(id: any) {
    this.collectionsList = [];
    const modal = this.modalService.open(ConfirmationModalComponent, {size: 'md', centered: true});
    modal.componentInstance.title = `Eliminar col·lecció`;
    modal.componentInstance.message = `Estàs segur que vols eliminar la teva subscripció? Perdràs tot el teu progrès.`;
    modal.result.then(async (result: any) => {
      if (result) {
        await this.service.unsubscribeFromCollection(id);
        await this.getCollections();
      }
    });
  }
}
