import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { COLLECTIONS_ENDPOINTS } from "../../core/constants/api";
import { CollectionDTO } from "../../core/models/collectionDTO";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http: HttpClient = inject(HttpClient);

  async getCollections(): Promise<CollectionDTO[]> {
    return await firstValueFrom(this.http.get<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.GET));
  }

  async postCollection(collection: CollectionDTO): Promise<CollectionDTO[]> {
    const result = await firstValueFrom(this.http.post<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.CREATE, collection));
    return await this.getCollections();
  }

  async deleteCollection(collection_id: string): Promise<CollectionDTO[]> {
    await firstValueFrom(this.http.delete<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.DELETE(collection_id)));
    return await this.getCollections();
  }
}
