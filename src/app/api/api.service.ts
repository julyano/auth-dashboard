import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = `${environment.api.baseUrl}${environment.api.prefix}`;

  constructor(
    protected http: HttpClient,
  ) {}

  public getBaseUrl() {
    return this.baseUrl;
  }

  public getRequest(endpoint: string, options: any = {}): Observable<any> {
    return this.http.get(`${this.getBaseUrl()}${endpoint}`, Object.assign({ headers: options}));
  }

  public postRequest(endpoint: string, body: any, options: any = {}): Observable<any> {
    return this.http.post(`${this.getBaseUrl()}${endpoint}`, body, Object.assign({ headers: options }));
  }

  public putRequest(endpoint: string, body: any, options: any = {}): Observable<any> {
    return this.http.put(`${this.getBaseUrl()}${endpoint}`, body, Object.assign({ headers: options}));
  }

  public deleteRequest(endpoint: string, options: any = {}): Observable<any> {
    return this.http.delete(`${this.getBaseUrl()}${endpoint}`, Object.assign({ headers: options }));
  }
}
