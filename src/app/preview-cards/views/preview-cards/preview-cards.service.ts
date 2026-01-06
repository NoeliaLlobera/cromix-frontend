import {inject, Injectable} from '@angular/core';
import {CromoTypeDTO} from "../../../core/models/cromo-typeDTO";
import {HttpClient} from "@angular/common/http";
import {CROMO_TYPES_ENDPOINTS} from "../../../core/constants/api";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreviewCardsService {

  private readonly http: HttpClient = inject(HttpClient);

  async getCromosByCollectionId(param: any) {
    return await firstValueFrom(this.http.get<CromoTypeDTO[]>(`${CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(param)}`));
  }
}
