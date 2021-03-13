import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { User } from 'src/app/users/user/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private user: User = new User;
  loginform!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  isSubmiting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage) { }

  async ngOnInit() {
    this.createFormControls();
    this.createForm();

    if (this.localStorage.getItem('AuthToken') !== null) {
      this.router.navigate(['/home']);
    }
  }

  createFormControls() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    /*this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);*/
    /*this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);*/
  }

  createForm() {
    this.loginform = new FormGroup({
      username: this.username,
      password: this.password
    });
  }


  async login() {
    if (this.loginform.valid) {
      console.log("Form Submitted!");
      this.loginform.disable();
      this.isSubmiting = true;
      this.user.username = this.username.value;
      this.user.password = this.password.value;
      console.log('user = ', this.user);


      await this.authService.login(this.user).then(() => {
        this.loginform.enable();
        this.isSubmiting = false;
      });
      this.loginform.reset();
    }
  }
}
