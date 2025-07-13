import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {COLLECTIONS_ENDPOINTS} from "../../core/constants/api";
import {CollectionDTO} from "../../core/models/collectionDTO";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http: HttpClient = inject(HttpClient);

  getCollections(): Observable<CollectionDTO[]> {
    return this.http.get<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.GET);
  }

  postCollection(collection: CollectionDTO): Observable<CollectionDTO[]> {
    return this.http.post<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.CREATE, collection);
  }

  deleteCollection(collection_id: string): Observable<CollectionDTO[]> {
    return this.http.delete<CollectionDTO[]>(COLLECTIONS_ENDPOINTS.DELETE(collection_id));
  }
}
