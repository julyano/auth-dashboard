import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/authentication/auth.service';
import { Token } from '../users/user/shared/token.model';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = `${environment.api.baseUrl}${environment.api.prefix}`;

  constructor(
    protected http: HttpClient,
    protected authService: AuthService
  ) {}

  protected getHttpHeaders(): Observable<HttpHeaders> {
    try {
      this.authService.getToken()
      .then((token: Token) => {
        const header = new HttpHeaders({
          'Authorization': `Bearer ${token.token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        });
        // 'Content-Type', 'application/json'
        return of(header);
      })

    } catch (error) {
      console.log('erro');
    }

    return of(new HttpHeaders());
  }

  public getBaseUrl() {
    return this.baseUrl;
  }

  public getRequest(url: string, options: any = {}): Observable<any> {
    return this.getHttpHeaders()
      .pipe(
        map((httpHeaders: HttpHeaders) => this.http.get(url, Object.assign({ headers: httpHeaders }, options)))
      );
  }

  public postRequest(url: string, body: any, options: any = {}): Observable<any> {
    return this.getHttpHeaders()
      .pipe(
        map((httpHeaders: HttpHeaders) => this.http.post(url, body, Object.assign({ headers: httpHeaders }, options)))
      );
  }

  public putRequest(url: string, body: any, options: any = {}): Observable<any> {
    return this.getHttpHeaders()
      .pipe(
        map((httpHeaders: HttpHeaders) => this.http.put(url, body, Object.assign({ headers: httpHeaders }, options)))
      );
  }

  public deleteRequest(url: string, options: any = {}): Observable<any> {
    return this.getHttpHeaders()
      .pipe(
        map((httpHeaders: HttpHeaders) => this.http.delete(url, Object.assign({ headers: httpHeaders }, options)))
      );
  }
}
