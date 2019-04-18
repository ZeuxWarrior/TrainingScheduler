import { Component, OnInit } from '@angular/core';
import { ISession } from '../sessions';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionsService } from '../sessions.service';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnInit {

  sessions: ISession[];
  query = '';
  canAdd = false;

  searchForm = new FormGroup({
    query: new FormControl(this.query)
  });

  constructor(private sessionsService: SessionsService, private authService: AuthService) { }

  ngOnInit() {
    this.getSessions();
    this.searchForm.get('query').valueChanges.
      pipe(debounceTime(350)).subscribe((value) => {
        this.query = value;
        this.getSessions();
      });
    this.canAdd = this.authService.isTrainer() || this.authService.isAdmin();
  }

  getSessions() {
    this.sessionsService.getByName(this.query).subscribe((sessions) => {
      this.sessions = sessions;
    });
  }
}
