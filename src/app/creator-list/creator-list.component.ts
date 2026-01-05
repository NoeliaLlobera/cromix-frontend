import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {HomeService} from "../home/service/home.service";
import {
  CreateCollectionModalComponent
} from "../home/components/create-collection-modal/create-collection-modal.component";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {CollectionCardComponent} from "../shared/components/collection-card/collection-card.component";

@Component({
  selector: 'app-creator-list',
  imports: [
    TranslatePipe,
    CollectionCardComponent,
  ],
  templateUrl: './creator-list.component.html',
  styleUrl: './creator-list.component.scss'
})
export class CreatorListComponent implements OnInit {
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);
  private readonly service: HomeService = inject(HomeService);
  collections!: any[] | null;
  isLoading = false;

  async ngOnInit() {
    this.isLoading = true;
    this.collections = await this.service.getCollections();
    this.isLoading = false;
  }

  async openModal() {
    const result =
      await this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true}).result;
    const user = JSON.parse(localStorage.getItem('user')!);

    const collection = {
      ...result,
      creator_id: user.id
    }
    console.log(collection);
    this.collections = await this.service.postCollection(collection);
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
        this.collections = await this.service.deleteCollection(collection_id);
      }
    });
  }
}
