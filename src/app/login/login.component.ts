import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;
  loginForm: FormGroup;
  status!: string;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  signup() {
    const { email, password } = this.loginForm.value;
    this.authService.signup(email, password).then(() => {
      this.router.navigate(['/dashboard']);
      this.status = 'Successfully registered!';
    }).catch(error => {
      this.status = 'Error registering: ' + error.message;
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(() => {
      this.router.navigate(['/dashboard']);
      this.status = 'Successfully logged in!';
    }).catch(error => {
      this.status = 'Error logging in: ' + error.message;
    });
  }
  

  guestLogin() {
    this.authService.guestLogin().then(() => {
      // Code to execute after successful guest login
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      // Code to execute if there's an error
    });
  }
}
