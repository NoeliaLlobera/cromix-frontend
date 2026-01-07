import {inject, Injectable} from '@angular/core';
import {CromoTypeDTO} from "../../../../core/models/cromo-typeDTO";
import {HttpClient} from "@angular/common/http";
import {COLLECTIONS_ENDPOINTS, CROMO_ENDPOINTS, CROMO_TYPES_ENDPOINTS} from "../../../../core/constants/api";
import {firstValueFrom} from "rxjs";
import {CollectionDTO} from "../../../../core/models/collectionDTO";
import {LoginService} from "../../../../login/service/login.service";
import {UserDTO} from "../../../../core/models/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class CardsListService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly login: LoginService = inject(LoginService);

  async getCromos(collectionId: string){
    const user: UserDTO | null = await firstValueFrom(this.login.user$);
    const userId = user!.id;
    if(!userId) {
      throw new Error('User not logged in');
    }

    return await firstValueFrom(this.http.get<any[]>(`${CROMO_ENDPOINTS.GET_BY_USER_ID(userId, collectionId)}`));
  }


  async getCollectionById(param: any): Promise<CollectionDTO> {
    return await firstValueFrom(this.http.get<CollectionDTO>(`${COLLECTIONS_ENDPOINTS.GET_BY_ID(param)}`));
  }

  async getPack(params: any) {
    const user: UserDTO | null = await firstValueFrom(this.login.user$);
    const userId = user!.id;
    return await firstValueFrom(this.http.post<any[]>(`${CROMO_ENDPOINTS.CREATE_MULTIPLE}`, {...params, owner: userId}) );
  }
}
