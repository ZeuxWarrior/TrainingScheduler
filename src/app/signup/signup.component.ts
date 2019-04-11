import { Component } from '@angular/core';
import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phone = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  signUp(): void {
    const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone
    };

    if (newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.phone) {
        this.authService.signup(newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.phone).
          subscribe((response) => {
            this.router.navigateByUrl('/login');
          });
    }

  }

}