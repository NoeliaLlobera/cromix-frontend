import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {selectCromoTupes} from "../../../store/cromos/cromos.selectors";
import {getCromos} from "../../../store/cromos/cromos.actions";

@Component({
  selector: 'app-preview-cards',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './preview-cards.component.html',
  styleUrl: './preview-cards.component.scss'
})
export class PreviewCardsComponent implements OnInit {
  protected route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly store = inject(Store);
  cromos: WritableSignal<CromoTypeDTO[]> = signal([]);
  index: number = 0;
  mode!: string;


  async ngOnInit(): Promise<void> {

    this.store.dispatch(getCromos({collection_id: this.route.snapshot.params['collectionId']}));
    this.store.select(selectCromoTupes).subscribe(cromos => {
        this.cromos.set(cromos);
      }
    );
    if (this.route.snapshot.title === 'preview.title') {
      this.mode = 'preview';
    }
  }


  nextCard() {
    if (this.index + 1 < this.cromos().length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  previousCard() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.cromos().length - 1;
    }
  }

  async back() {
    if (this.mode === 'preview') await this.router.navigate(['edit', `${this.route.snapshot.params['collectionId']}`]);
  }
}
