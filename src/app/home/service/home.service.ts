import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {COLLECTIONS_ENDPOINTS} from "../../core/constants/api";
import {CollectionDTO} from "../../core/models/collectionDTO";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http: HttpClient = inject(HttpClient);

  async getCollections(): Promise<CollectionDTO[]> {
    const response: any = await lastValueFrom(this.http.get(COLLECTIONS_ENDPOINTS.GET));

    return response
  }

  async postCollection(result: Promise<any>) {
    return await lastValueFrom(this.http.post(COLLECTIONS_ENDPOINTS.CREATE, result));
  }
}
