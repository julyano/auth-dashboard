import { Injectable } from '@angular/core';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { ResourceModel } from '../shared/models/resource.model';
import { ApiFilter } from './api-filter.interface';
import { Api } from './api.service';

export enum ChangeType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T extends ResourceModel> {

  protected readonly abstract endpoint: string;

  constructor(
    protected http: Api,
    protected localStorage: LocalStorage,
  ) { }

  public all(apiFilter: ApiFilter, options: any = { observe: 'response' }): Observable<any> {
    return this.http.getRequest(`${this.http.getBaseUrl()}/${this.endpoint}?filter=${encodeURI(JSON.stringify(apiFilter))}`, options);
  }

  public get(uuid: string, apiFilter: ApiFilter = {}): Observable<any> {
    return this.http.getRequest(`${this.http.getBaseUrl()}/${this.endpoint}/${uuid}?filter=${encodeURI(JSON.stringify(apiFilter))}`);
  }

  public getById(id: number, apiFilter: ApiFilter = {}): Observable<any> {
    return this.http.getRequest(`${this.http.getBaseUrl()}/${this.endpoint}/${id}?filter=${encodeURI(JSON.stringify(apiFilter))}`);
  }

  public create(model: T): Observable<any> {
    return this.http
      .postRequest(`${this.http.getBaseUrl()}/${this.endpoint}`, model);
  }

  public update(uuid: string, model: T): Observable<any> {
    return this.http
      .putRequest(`${this.http.getBaseUrl()}/${this.endpoint}/${uuid}`, model);
  }

  public delete(uuid: string): Observable<any> {
    return this.http
      .deleteRequest(`${this.http.getBaseUrl()}/${this.endpoint}/${uuid}`);
  }

  public count(): Observable<any> {
    return this.http.getRequest(`${this.http.getBaseUrl()}/${this.endpoint}/count`);
  }

}
