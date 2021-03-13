import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { User } from 'src/app/users/user/shared/user.model';
import { UserService } from 'src/app/users/user/shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private user: User = new User;
  registerForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  email!: FormControl;
  isSubmiting = false;

  constructor(
    private userService: UserService,
    private router: Router) { }

  async ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    /*this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);*/
  }

  createForm() {
    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }


  async register() {
    if (this.registerForm.valid) {
      this.registerForm.disable();
      this.isSubmiting = true;
      console.log("Form Submitted!");
      this.user.username = this.username.value;
      this.user.email = this.email.value;
      this.user.password = this.password.value;

      console.log('user = ', this.user);


      await this.userService.create(this.user).toPromise().then((result) => {
        console.log('res = ', result);

        this.registerForm.reset();
        this.registerForm.enable();
        this.isSubmiting = false;
      });

      this.router.navigate(["/login"]);
    }
  }
}
