import { Component } from '@angular/core';

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
  
  constructor() { }

  signUp(): void {
    const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone
    };

    if (newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.phone) {
        console.log(newUser);
    }

  }

}