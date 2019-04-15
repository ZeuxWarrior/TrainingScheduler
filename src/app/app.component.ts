import { Component, OnInit } from '@angular/core';
import { AuthService } from './common/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  loggedIn = false;
  user = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.token
      .subscribe((token) => this.loggedIn = token ? true : false);
    this.authService.user.
      subscribe((user) => this.user = user);
  }

  logout(): void {
    this.authService.logout();
  }

}
