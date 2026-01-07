import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CardsListService} from "./service/cards-list.service";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "./components/modal/modal.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-preview-cards',
  imports: [
    TranslatePipe,
    LoaderComponent,
    JsonPipe,
  ],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit, OnDestroy {
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
  private intervalId!: number;
  private secondsToNextPack!: number;
  countdown: { hours: number; minutes: number; seconds: number } | null = null;


  ngOnInit() {
    this.getCromos().then()
    this.getCollection().then();


    if (this.route.snapshot.url[0].path) {
      this.mode = this.route.snapshot.url[0].path;
    } else {
      this.mode = 'preview';
    }

    this.intervalId = window.setInterval(() => {
      this.checkPackAvailability();
    }, 1000);
  }

  ngOnDestroy() {
    // Limpia el intervalo cuando el componente se destruye
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private checkPackAvailability() {
    // Tu lógica aquí (se ejecutará cada segundo)
    console.log('Checking pack availability...');
    // Ejemplo: actualizar packAvailable según alguna condición

    //comprovar cuantos segundos faltan para que this.originalCromos[0].created_at + this.collection.periodicity teniendo en cuenta que periodicity són horas
    if (this.originalCromos.length > 0) {
      const lastPackTime = new Date(this.originalCromos[0].created_at).getTime();
      const nowUTC = new Date().toISOString();
      const now = new Date(nowUTC).getTime();
      const periodicityInMs = this.collection!.periodicity! * 60 * 60 * 1000;
      this.packAvailable = now >= (lastPackTime + periodicityInMs);
      this.secondsToNextPack = Math.max(0, Math.floor((lastPackTime + periodicityInMs - now) / 1000));
      if(this.packAvailable) {
        this.countdown = null;
        return;
      }
      this.countdown = {
        hours: Math.floor(this.secondsToNextPack / 3600),
        minutes: Math.floor((this.secondsToNextPack % 3600) / 60),
        seconds: this.secondsToNextPack % 60
      };

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
