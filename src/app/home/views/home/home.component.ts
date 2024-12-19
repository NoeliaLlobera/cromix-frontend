import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {HomeService} from "../../service/home.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CreateCollectionModalComponent
} from "../../components/create-collection-modal/create-collection-modal.component";
import {Router} from "@angular/router";

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
  public collections: CollectionDTO[] = [];

  async ngOnInit() {
    this.collections = await this.service.getCollections();
  }

  async openModal() {
    const result = this.modalService.open(CreateCollectionModalComponent, {size: 'lg', centered: true }).result;
    await this.service.postCollection(result);

    await this.service.getCollections();
  }


  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
  }
}
