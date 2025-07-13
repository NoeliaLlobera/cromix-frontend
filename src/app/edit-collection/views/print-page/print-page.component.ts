import {AfterViewChecked, AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EditCollectionService} from "../../services/edit-collection.service";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../../core/services/config.service";
import {REVERSE_IMAGE} from "../../../core/constants";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCromoTupes} from "../../../store/cromos/cromos.selectors";
import {AsyncPipe} from "@angular/common";
import {getCromos} from "../../../store/cromos/cromos.actions";

@Component({
  selector: 'app-print-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.scss'
})
export class PrintPageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly configService: ConfigService = inject(ConfigService);
  private readonly store = inject(Store);

  cromoTypeData$!: Observable<CromoTypeDTO[]>;

  constructor() {
    this.configService.hasHeader.set(false);
  }

  async ngOnInit() {
    this.store.dispatch(getCromos({collection_id: this.route.snapshot.params['id']}));
    this.cromoTypeData$ = this.store.select(selectCromoTupes);
    setTimeout(() => {
      window.print();
    }, 500);

  }


  async ngOnDestroy() {
    this.configService.hasHeader.set(true);
  }


  protected readonly REVERSE_IMAGE = REVERSE_IMAGE;
}
