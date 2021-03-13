import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(
    protected localStorage: LocalStorage
  ) {}

  public getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem('AuthToken');
    let header = new HttpHeaders({'Content-Type': 'application/json'});

    if (token !== null) {
      header.append('Authorization', `Bearer ${token}`);
    }
    return header;
  }


}
