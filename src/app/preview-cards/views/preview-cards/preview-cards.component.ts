import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {selectCromoTupes} from "../../../store/cromos/cromos.selectors";
import {getCromos} from "../../../store/cromos/cromos.actions";
import {PreviewCardsService} from "./preview-cards.service";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-preview-cards',
  imports: [
    TranslatePipe,
    LoaderComponent,
  ],
  templateUrl: './preview-cards.component.html',
  styleUrl: './preview-cards.component.scss'
})
export class PreviewCardsComponent implements OnInit {
  protected route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  cromos: WritableSignal<CromoTypeDTO[] | null> = signal(null);
  index: number = 0;
  mode!: string;

  private readonly service: PreviewCardsService = inject(PreviewCardsService);


  ngOnInit() {
    this.getCromos().then();

    if (this.route.snapshot.url[0].path) {
      this.mode = this.route.snapshot.url[0].path;
    } else {
      this.mode = 'preview';
    }

  }

  async getCromos() {
    this.cromos.set(await this.service.getCromosByCollectionId(this.route.snapshot.params['collectionId']));
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
    if(this.mode === 'detail') await this.router.navigate(['/home']);
  }

  protected goToCard(i: number) {

  }
}
