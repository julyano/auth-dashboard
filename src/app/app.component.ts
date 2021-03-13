import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard-app';

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.routeVerify();
  }

  async routeVerify() {
    const res = await this.authService.getToken().then((result) => (result?.access_token != null));
    if (!res) {
      this.router.navigate(['/login']);
    }
  }
}
