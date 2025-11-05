import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { REVERSE_IMAGE } from "../../../core/constants";
import { CromoTypeDTO } from "../../../core/models/cromo-typeDTO";
import { ConfigService } from "../../../core/services/config.service";
import { EditCollectionService } from "../../services/edit-collection.service";

@Component({
  selector: 'app-print-page',
  imports: [],
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.scss'
})
export class PrintPageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly configService: ConfigService = inject(ConfigService);
  private readonly service: EditCollectionService = inject(EditCollectionService);

  cromoTypes: CromoTypeDTO[] = [];
  protected readonly REVERSE_IMAGE = REVERSE_IMAGE;

  constructor() {
    this.configService.hasHeader.set(false);
  }

  async ngOnInit() {
    const collectionId = this.route.snapshot.params['id'];
    this.cromoTypes = await this.service.getCromos(collectionId);

    setTimeout(() => {
      window.print();
    }, 500);
  }

  async ngOnDestroy() {
    this.configService.hasHeader.set(true);
  }
}