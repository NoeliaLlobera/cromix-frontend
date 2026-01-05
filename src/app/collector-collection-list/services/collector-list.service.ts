import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {CollectionDTO} from "../../core/models/collectionDTO";
import {COLLECTING_USERS_ENDPOINTS, COLLECTIONS_ENDPOINTS} from "../../core/constants/api";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../login/service/login.service";

@Injectable({
  providedIn: 'root'
})
export class CollectorListService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly login: LoginService = inject(LoginService);
  constructor() { }

  async getCollections(value: string) {
    return await firstValueFrom(
      this.http.get<CollectionDTO[]>(`${COLLECTIONS_ENDPOINTS.GET_ALL}?collectionName=${value}`)
    );
  }

  async subscribeToCollection(collection_id: any) {

    const user = await firstValueFrom(this.login.user$);
    console.log(user);

    return await firstValueFrom(
      this.http.post(`${COLLECTING_USERS_ENDPOINTS.ADD_USER_TO_COLLECTION}`, {userId: user?.id, collectionId:collection_id })
    );
  }

  async getUserCollections() {
    const user = await firstValueFrom(this.login.user$);

    return await firstValueFrom(
      this.http.get<CollectionDTO[]>(`${COLLECTING_USERS_ENDPOINTS.GET_COLLECTIONS_BY_USER(user!.id)}`)
    );
  }

  async unsubscribeFromCollection(id: any) {
    return await firstValueFrom(this.http.delete(`${COLLECTING_USERS_ENDPOINTS.REMOVE_USER_FROM_COLLECTION(id)}`));
  }
}
