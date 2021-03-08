import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from 'src/app/users/user/shared/user.model';
import { Token } from 'src/app/users/user/shared/token.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username: string = '';
  protected tokenKey: string = 'AuthToken';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  set isLoggedIn(value: any) {
    this.loggedIn = new BehaviorSubject<boolean>(value);
    const token = this.getCurrentUserToken();
  }

  get userName() {
    return this.username;
  }

  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private http: HttpClient
  ) {}

  async login(user: User) {
    if (user?.username !== '' && user?.password !== '' ) {
      await this.requestToken(user);

      if (localStorage.getItem(this.tokenKey)) {
        this.loggedIn.next(true);
        this.username = user.username;
      }
    }

    this.logout();
  }

  async logout() {
    await this.removeToken();
    await this.loggedIn.next(false);
  }

  private async storeNewToken(token: Token) {
    await this.localStorage.setItem(this.tokenKey, token).toPromise();
  }

  public async getToken(): Promise<Token> {
    const token: Token = await this.localStorage.getItem(this.tokenKey).toPromise() as Token;
    return token;
  }

  async requestToken(user: User) {
    const requestUrl = `${environment.api.baseUrl}/token`;

    const requestData = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);
    const requestHeaders = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    //'Content-Type', 'application/x-www-form-urlencoded'

    try {
      const token: Token = (await this.http.post(requestUrl, requestData.toString(), requestHeaders).toPromise()) as Token;
      await this.storeNewToken(token);
    } catch (err) {

    }
  }


  public async removeToken() {
    this.isLoggedIn = false;
    let result = false;

    try {
      result = await this.localStorage.removeItem(this.tokenKey).toPromise()

    } catch (error) {
      console.log('erro');
    }

    let clr = false;

    if (result) {
      try {
        clr = await this.localStorage.clear().toPromise();
      } catch (error) {
        console.log('erro');
      }
    }

    if (clr) {
      this.loggedIn.next(false);
      await this.router.navigate(['/login']);
    }
  }

  public async getCurrentUserToken() {
    const token: Token = await this.localStorage.getItem(this.tokenKey).toPromise() as Token;
    return token;
  }

}
