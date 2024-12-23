import {inject, Injectable} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {COLLECTIONS_ENDPOINTS, CROMO_TYPES_ENDPOINTS} from "../../core/constants/api";
import {CollectionDTO} from "../../core/models/collectionDTO";
import {CromoTypeDTO} from "../../core/models/cromo-typeDTO";

@Injectable({
  providedIn: 'root'
})
export class EditCollectionService {
  private readonly http: HttpClient = inject(HttpClient);


  async getCollectionById(id: string): Promise<CollectionDTO[]> {
    const response: any = await lastValueFrom(this.http.get(COLLECTIONS_ENDPOINTS.GET_BY_ID(id)));

    return response
  }

  async getCromoTypeByCollectionId(id: string): Promise<CromoTypeDTO[]> {
    const response: any = await lastValueFrom(this.http.get(CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(id)));

    return response;
  }
}
