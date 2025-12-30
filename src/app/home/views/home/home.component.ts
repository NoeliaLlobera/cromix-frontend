import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {
  CreateCollectionModalComponent
} from "../../components/create-collection-modal/create-collection-modal.component";
import {HomeService} from '../../service/home.service';
import {CollectorCollectionListComponent} from "../../../collector-collection-list/collector-collection-list.component";
import {CreatorCollectionListComponent} from "../../../creator-collection-list/creator-collection-list.component";

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    LoaderComponent,
    CollectorCollectionListComponent,
    CreatorCollectionListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);
  private readonly service: HomeService = inject(HomeService);
  collections!: any[] | null;
  modeCollector: WritableSignal<boolean> = signal(false);
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
