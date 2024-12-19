import {AfterViewChecked, AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EditCollectionService} from "../../services/edit-collection.service";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../../core/services/config.service";

@Component({
  selector: 'app-print-page',
  imports: [],
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.scss'
})
export class PrintPageComponent implements OnInit, OnDestroy {
  private readonly service: EditCollectionService = inject(EditCollectionService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly configService: ConfigService = inject(ConfigService);

  cromoTypeData: CromoTypeDTO[] = [];

  constructor() {
    this.configService.hasHeader.set(false);
  }

  async ngOnInit() {
    this.cromoTypeData = await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']);
    // open print dialog
    setTimeout(() => {
      window.print();
    }, 500);

  }



  async ngOnDestroy() {
    this.configService.hasHeader.set(true);

  }


}
