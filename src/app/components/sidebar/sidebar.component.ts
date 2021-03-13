import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public username: string = "";
  private itemName: string = "username";

  constructor(
    private authService: AuthService,
    private router: Router,
    private params: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let uname = localStorage.getItem(this.itemName);

    if (uname === null) {
      this.username = this.params?.snapshot?.params?.username;
      localStorage.setItem(this.itemName, this.username);
    } else {
      this.username = uname;
    }
  }

  async logout() {
    await this.authService.logout();
    localStorage.removeItem(this.itemName)
    this.username = "";
    this.router.navigate(['/login']);
  }

}
