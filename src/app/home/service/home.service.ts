import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {COLLECTIONS_ENDPOINTS} from "../../core/constants/api";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http: HttpClient = inject(HttpClient);

  async getCollections() {
    const response = await lastValueFrom(this.http.get(COLLECTIONS_ENDPOINTS.GET));
    console.log(response);


  }
}
