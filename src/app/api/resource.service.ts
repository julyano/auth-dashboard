import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { ResourceModel } from '../shared/models/resource.model';
import { ApiFilter } from './api-filter.interface';
import { Api } from './api.service';
import { HttpHeaderService } from './httpHeader.service';

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
    protected api: Api,
    protected localStorage: LocalStorage,
    protected httpHeadersService: HttpHeaderService,
  ) {

   }

  public all(apiFilter: ApiFilter, options: any = { observe: 'response' }): Observable<any> {
    return this.api.getRequest(`${this.endpoint}?filter=${encodeURI(JSON.stringify(apiFilter))}`, options);
  }

  public get(uuid: string, apiFilter: ApiFilter = {}): Observable<any> {
    return this.api.getRequest(`${this.endpoint}/${uuid}?filter=${encodeURI(JSON.stringify(apiFilter))}`);
  }

  public getById(id: number, apiFilter: ApiFilter = {}): Observable<any> {
    return this.api.getRequest(`${this.endpoint}/${id}?filter=${encodeURI(JSON.stringify(apiFilter))}`);
  }

  public create(model: T): Observable<any> {
    return this.api
      .postRequest(`${this.endpoint}`, model);
  }

  public update(uuid: string, model: T): Observable<any> {
    return this.api
      .putRequest(`${this.endpoint}/${uuid}`, model);
  }

  public delete(uuid: string): Observable<any> {
    return this.api
      .deleteRequest(`${this.endpoint}/${uuid}`);
  }

  public count(): Observable<any> {
    return this.api.getRequest(`${this.endpoint}/count`);
  }

  public token(model: T) {
    return this.api.postRequest(`${this.endpoint}`, model, Object.assign({ headers: this.httpHeadersService.getHttpHeaders() }));
  }

}
