import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PreviewCardsService} from "../../services/preview-cards.service";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {TranslatePipe} from "@ngx-translate/core";

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
  private readonly service: PreviewCardsService = inject(PreviewCardsService);
  cromos: WritableSignal<CromoTypeDTO[]> = signal([]);
  index: number = 0;
  mode!: string;


  async ngOnInit(): Promise<void> {
    this.cromos.set(await this.service.getCollection(this.route.snapshot.params['collectionId']));
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
