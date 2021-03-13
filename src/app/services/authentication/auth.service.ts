import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from 'src/app/users/user/shared/user.model';
import { Token } from 'src/app/users/user/shared/token.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/users/user/shared/user.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { UserDTO } from 'src/app/users/user/shared/user-dto.model';

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
    private loginService: LoginService
  ) {}

  async login(user: User) {
    if (user?.username !== '' && user?.password !== '' ) {
      const token: Token = (await this.requestToken(user)) as Token;

      if (token?.access_token !== null) {
        await this.storeNewToken(token);
        this.loggedIn.next(true);
        let userDTO: UserDTO = new UserDTO();
        userDTO.username = user.username
        await this.router.navigate(['/home', userDTO]);
      }
    } else {
      this.logout();
    }

  }

  async logout() {
    await this.removeToken();
    this.loggedIn.next(false);
  }

  private async storeNewToken(token: Token) {
    await this.localStorage.setItem(this.tokenKey, token).toPromise();
  }

  public async getToken(): Promise<Token> {
    const token: Token = await this.localStorage.getItem(this.tokenKey).toPromise() as Token;
    return token;
  }

  async requestToken(user: User) {
    try {
      const token: Token = (await this.loginService.token(user).toPromise()) as Token;
      console.log('(authService) token = ', token);
      return token;
    } catch (err) {

    }

    return null;
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
