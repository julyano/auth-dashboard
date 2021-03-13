import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';
import { Token } from '../users/user/shared/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const res = this.authService.getToken().then((result) => (result?.access_token != null));
    if (!res) {
      this.router.navigate(['/login']);
    }

    return res;
  }

}
