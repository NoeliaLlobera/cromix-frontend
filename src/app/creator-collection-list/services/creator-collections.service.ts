import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {CollectionDTO} from "../../core/models/collectionDTO";
import {COLLECTIONS_ENDPOINTS} from "../../core/constants/api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreatorCollectionsService {

  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  async getCollections(value: string) {
    return await firstValueFrom(
      this.http.get<CollectionDTO[]>(`${COLLECTIONS_ENDPOINTS.GET_ALL}?collectionName=${value}`)
    );
  }
}
