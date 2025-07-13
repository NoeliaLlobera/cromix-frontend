import {inject, Injectable} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {COLLECTIONS_ENDPOINTS, CROMO_TYPES_ENDPOINTS} from "../../core/constants/api";
import {CollectionDTO} from "../../core/models/collectionDTO";
import {CromoTypeDTO} from "../../core/models/cromo-typeDTO";

@Injectable({
  providedIn: 'root'
})
export class EditCollectionService {
  private readonly http: HttpClient = inject(HttpClient);

  getCollectionById(id: string): Observable<CollectionDTO> {
    return this.http.get<CollectionDTO>(COLLECTIONS_ENDPOINTS.GET_BY_ID(id));
  }

  getCromoTypeByCollectionId(id: string): Observable<CromoTypeDTO[]> {
    return this.http.get<CromoTypeDTO[]>(CROMO_TYPES_ENDPOINTS.GET_BY_COLLECTION_ID(id));
  }

  createCromo(cromo: CromoTypeDTO): Observable<CromoTypeDTO> {
    return this.http.post<CromoTypeDTO>(CROMO_TYPES_ENDPOINTS.CREATE, cromo);
  }

  updateCromo(cromo: CromoTypeDTO): Observable<CromoTypeDTO> {
    return this.http.patch<CromoTypeDTO>(CROMO_TYPES_ENDPOINTS.UPDATE(cromo.id), cromo);
  }

  deleteCromo(cromoId: string): Observable<void> {
    return this.http.delete<void>(CROMO_TYPES_ENDPOINTS.DELETE(cromoId));
  }
}
