import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

  userUpdateForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
  });

  saved = false;

  constructor(private authService: AuthService, private router: Router) {
      
  }

  save(): void {
      this.authService.update(this.userUpdateForm).
        subscribe((response) => {
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 3000);
        });
  }

}
