import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {CreatorCollectionsService} from "./services/creator-collections.service";

@Component({
  selector: 'app-creator-collection-list',
  imports: [FormsModule, FormsModule, TranslatePipe],
  templateUrl: './creator-collection-list.component.html',
  styleUrl: './creator-collection-list.component.scss'
})
export class CreatorCollectionListComponent {
  protected searchControl: any;

  private readonly service: CreatorCollectionsService = inject(CreatorCollectionsService);
  protected collectionsList: any[] = [];


  protected async onSearch() {
   const result = await this.service.getCollections(this.searchControl || '');
    this.collectionsList = result;
  }
}
