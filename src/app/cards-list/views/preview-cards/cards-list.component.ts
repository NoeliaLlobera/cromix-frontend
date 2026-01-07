import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CardsListService} from "./service/cards-list.service";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "./components/modal/modal.component";

@Component({
  selector: 'app-preview-cards',
  imports: [
    TranslatePipe,
    LoaderComponent,
  ],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {
  protected route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  cromos: WritableSignal<any[] | null> = signal(null);
  index: number = 0;
  mode!: string;
  collection!: CollectionDTO;
  private originalCromos: any[] = [];



  private readonly service: CardsListService = inject(CardsListService);
  private modalService: NgbModal = inject(NgbModal);

  protected packAvailable: boolean = true;
   hideRepseated: any = false;
   uniqueCromos!: any[];


  ngOnInit() {
    this.getCromos().then()
    this.getCollection().then();

    if (this.route.snapshot.url[0].path) {
      this.mode = this.route.snapshot.url[0].path;
    } else {
      this.mode = 'preview';
    }
  }

  async getCromos() {
    this.cromos.set(await this.service.getCromos(this.route.snapshot.params['collectionId']));
    for (let cromo of this.cromos()!) {
      let count = 0;
      for (let cromo2 of this.cromos()!) {
        if (cromo.cromo_type_id === cromo2.cromo_type_id) {
          count++;
        }
      }
      cromo.cardsOfType = count;
    }
    this.originalCromos = [...this.cromos()!];
    const seen = new Set<number>();
    this.uniqueCromos = this.originalCromos.filter(cromo => {
      if (!seen.has(cromo.cromo_type_id)) {
        seen.add(cromo.cromo_type_id);
        return true;
      }
      return false;
    });

  }

  async getCollection() {
    this.collection = await this.service.getCollectionById(this.route.snapshot.params['collectionId']);
  }

  nextCard() {
    if (this.index + 1 < this.cromos()!.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  previousCard() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.cromos()!.length - 1;
    }
  }

  async back() {
    if (this.mode === 'preview') await this.router.navigate(['edit', `${this.route.snapshot.params['collectionId']}`]);
    if (this.mode === 'detail') await this.router.navigate(['/home']);
    await this.router.navigate(['/home']);
  }

  protected goToCard(i: number) {
    this.index = i;

  }

  async newPack() {
    const pack = await this.service.getPack({
      collectionId: this.collection.collection_id,
      cards_per_pack: this.collection.cards_per_pack
    });
    await this.openModal(pack);
  }

  async openModal(pack: any) {
    const modal = this.modalService.open(ModalComponent, {size: 'lg', centered: true});
    modal.componentInstance.title = `Nou pack`;
    modal.componentInstance.data = pack;

    this.getCollection();
    this.getCromos();


  }


  protected toggleHideRepeated($event: Event) {
    this.hideRepseated = !this.hideRepseated;

    if (this.hideRepseated) {
      this.cromos.set([...this.uniqueCromos]);
    } else {
      this.cromos.set([...this.originalCromos]);
    }
  }
}
