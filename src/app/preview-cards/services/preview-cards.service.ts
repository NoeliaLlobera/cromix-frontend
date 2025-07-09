import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CROMO_TYPES_ENDPOINTS} from "../../core/constants/api";
import {lastValueFrom} from "rxjs";
import {CromoTypeDTO} from "../../core/models/cromo-typeDTO";

@Injectable({
  providedIn: 'root'
})
export class PreviewCardsService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() {
  }

  async getCollection(collectionId: string): Promise<CromoTypeDTO[]> {
    console.log(collectionId);
    const response: any = await lastValueFrom(this.http.get(CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(collectionId)));
    return response;
  }
}
