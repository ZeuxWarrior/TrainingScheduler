import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEvent } from '../../events/events';
import { IUser } from '../../common/users';
import { IVenue } from './venues';
import { ISession } from '../sessions';
import { SessionsService } from '../sessions.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../common/auth/auth.service';
import { EventsService } from '../../events/events.service';
import { VenuesService } from './venues.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html'
})
export class SessionInfoComponent implements OnInit {

  sessionForm = new FormGroup({
    topicName: new FormControl(''),
    eventId: new FormControl(0, Validators.min(1)),
    trainerId: new FormControl(0, Validators.min(1)),
    venueId: new FormControl(0, Validators.min(1)),
    roomNum: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  });

  events: IEvent[];
  trainers: IUser[];
  venues: IVenue[];
  
  userId: number;
  saved = false;

  session: ISession;

  constructor(private sessionsService: SessionsService, private activeRoute: ActivatedRoute,
              private authService: AuthService, private eventsService: EventsService,
              private venuesService: VenuesService) { }

  get topicName() {
    return this.sessionForm.get('topicName');
  }

  get eventId() {
    return this.sessionForm.get('eventId');
  }

  get trainerId() {
    return this.sessionForm.get('trainerId');
  }

  get venueId() {
    return this.sessionForm.get('venueId');
  }

  get roomNum() {
    return this.sessionForm.get('roomNum');
  }

  get startDate() {
    return this.sessionForm.get('startDate');
  }

  get endDate() {
    return this.sessionForm.get('endDate');
  }
              
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.userId = this.authService.user.getValue().id;
    if (id !== 'add') {
      this.getSession(+id);
      if(this.userId !== this.sessionForm.get('trainerId').value && !this.authService.isAdmin()) {
        this.sessionForm.disable();
      }
    } else if (!this.authService.isAdmin()) {
      this.embedTrainerId(this.userId);
    }
    if (!this.sessionForm.disabled) {
      this.getEvents();
      this.getTrainers();
      this.getVenues();
    }
  }

  getSession(id: number): void {
    this.sessionsService.getById(id).subscribe(
      (session) => {
        this.session = session;
        this.sessionForm.patchValue(session);
      },
      (error) => {
        console.log('Could not find session by id');
      }
    );
  }

  embedTrainerId(id: number): void {
    this.sessionForm.patchValue({ trainerId: id });
    this.sessionForm.controls.trainerId.disable({ onlySelf: true });
  }

  getEvents() {
    this.eventsService.getByName('').pipe(take(1)).subscribe((events) => { // TODO: Create another service function to only grab the bare minimum
      this.events = events;
    });
  }

  getTrainers() {
    this.authService.getAllTrainers().pipe(take(1)).subscribe((trainers) => { // TODO: Create another service function to only grab the bare minimum
      this.trainers = trainers;
    });
  }

  getVenues() {
    this.venuesService.getByName('').pipe(take(1)).subscribe((venues) => { // TODO: Create another service function to only grab the bare minimum
      this.venues = venues;
    });
  }

  save(): void {
    let sessionToSave = this.sessionForm.value;
    sessionToSave.id = this.session ? this.session.id : 0;
    this.sessionsService.saveSession(sessionToSave).subscribe(
      (response) => {
        this.saved = true;
        setTimeout(() => {
          this.saved = false;
        }, 3000);
      },
      (error) => {
        console.log('Session failed to save');
      }
    );
  }
}
