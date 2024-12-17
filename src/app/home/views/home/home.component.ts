import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {CollectionDTO} from "../../../core/models/collectionDTO";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly service: HomeService = inject(HomeService);
  public collections: CollectionDTO[] = [
    {
      id: '1',
      collection_name: 'Collection 1',
      size: 5,
      creator_id: '1',
      users_connected: 3
    },
    {
      id: '2',
      collection_name: 'Collection 2',
      size: 3,
      creator_id: '2',
      users_connected: 2
    },
    {
      id: '3',
      collection_name: 'Collection 3',
      size: 7,
      creator_id: '3',
      users_connected: 5
    }
  ];

  async ngOnInit() {
    await this.service.getCollections();

  }

}
