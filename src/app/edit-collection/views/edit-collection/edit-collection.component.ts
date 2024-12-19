import {Component, inject, OnInit} from '@angular/core';
import {EditCollectionService} from "../../services/edit-collection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-collection',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss'
})
export class EditCollectionComponent implements OnInit {
  private readonly service: EditCollectionService = inject(EditCollectionService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  title: string;
  collectionData!: CollectionDTO;
  cromoTypeData: CromoTypeDTO[] = [];
  control = new FormControl();

  constructor() {
    this.title = this.route.snapshot.title || '';
  }

  async ngOnInit() {
    const collection: CollectionDTO[] = await this.service.getCollectionById(this.route.snapshot.params['id']);
    this.collectionData = collection[0];
    this.cromoTypeData = await this.service.getCromoTypeByCollectionId(this.route.snapshot.params['id']);
  }

  protected readonly print = print;

  printPage() {
    window.open(`/printPage/${this.route.snapshot.params['id']}`, '_blank');

  }
}
