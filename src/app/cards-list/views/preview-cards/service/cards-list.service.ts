import {inject, Injectable} from '@angular/core';
import {CromoTypeDTO} from "../../../../core/models/cromo-typeDTO";
import {HttpClient} from "@angular/common/http";
import {COLLECTIONS_ENDPOINTS, CROMO_TYPES_ENDPOINTS} from "../../../../core/constants/api";
import {firstValueFrom} from "rxjs";
import {CollectionDTO} from "../../../../core/models/collectionDTO";

@Injectable({
  providedIn: 'root'
})
export class CardsListService {

  private readonly http: HttpClient = inject(HttpClient);

  async getCromosByCollectionId(param: any) {
    return await firstValueFrom(this.http.get<CromoTypeDTO[]>(`${CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(param)}`));
  }

  async getCollectionById(param: any): Promise<CollectionDTO> {
    return await firstValueFrom(this.http.get<CollectionDTO>(`${COLLECTIONS_ENDPOINTS.GET_BY_ID(param)}`));
  }
}
