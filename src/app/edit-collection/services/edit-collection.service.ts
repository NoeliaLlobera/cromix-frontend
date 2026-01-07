import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import {COLLECTIONS_ENDPOINTS, CROMO_TYPES_ENDPOINTS} from "../../core/constants/api";
import { CollectionDTO } from "../../core/models/collectionDTO";
import { CromoTypeDTO } from "../../core/models/cromo-typeDTO";

@Injectable({
  providedIn: 'root'
})
export class EditCollectionService {
  private readonly http: HttpClient = inject(HttpClient);

  async getCollectionInfo(collection_id: string): Promise<CollectionDTO> {
    return await firstValueFrom(
      this.http.get<CollectionDTO>(`${COLLECTIONS_ENDPOINTS.GET}/${collection_id}`)
    );
  }

  async getCromos(collection_id: string): Promise<any> {
    return await firstValueFrom(
      this.http.get<CromoTypeDTO[]>(`${CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(collection_id)}`)
    );
  }

  async createCromo(cromo: CromoTypeDTO): Promise<CromoTypeDTO[]> {
    await firstValueFrom(
      this.http.post<CromoTypeDTO>(`${CROMO_TYPES_ENDPOINTS.CREATE}`, cromo)
    );
    return await this.getCromos(cromo.collection_id);
  }

  async updateCromo(cromo: CromoTypeDTO): Promise<CromoTypeDTO[]> {
    await firstValueFrom(
      this.http.patch<CromoTypeDTO>(`${CROMO_TYPES_ENDPOINTS.UPDATE(cromo.id)}`, cromo)
    );
    return await this.getCromos(cromo.collection_id);
  }

  async deleteCromo(cromo_id: string, collection_id: string): Promise<CromoTypeDTO[]> {
    await firstValueFrom(
      this.http.delete(`${CROMO_TYPES_ENDPOINTS.DELETE(cromo_id)}`)
    );
    return await this.getCromos(collection_id);
  }

  async updateCollection(collection: any) {
    console.log(collection.collection_id);
    await firstValueFrom(
      this.http.patch<CollectionDTO>(`${COLLECTIONS_ENDPOINTS.UPDATE(collection.collection_id)}`, collection)
    );
    return await this.getCollectionInfo(collection.collection_id);

  }
}
