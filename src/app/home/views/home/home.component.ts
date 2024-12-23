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
import {GrowlService} from "../../../core/services/growl.service";

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly service: HomeService = inject(HomeService);
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);
  private readonly growlService: GrowlService = inject(GrowlService);
  public collections: WritableSignal<CollectionDTO[]> = signal([]);

  async ngOnInit() {
    this.collections.set(await this.service.getCollections());
  }

  async openModal() {
    const result = await this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true}).result;

    const user = JSON.parse(localStorage.getItem('user')!);

    const collection = {
      collection_name: result,
      creator_id: user.id
    }

    await this.service.postCollection(collection);
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
          await this.service.deleteCollection(collection_id);
          this.growlService.setMessage('Col·lecció eliminada correctament', 'success');
          this.collections.set(await this.service.getCollections());
        } catch (err) {
          this.growlService.setMessage('err', 'danger');
        }
      }
    });
  }
}
