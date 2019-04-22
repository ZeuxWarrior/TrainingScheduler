import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/events.service';
import { IEvent } from '../../events/events';
import { IUser } from '../../common/users';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-event-picker',
  templateUrl: './event-picker.component.html'
})
export class EventPickerComponent implements OnInit {

  events: IEvent[];
  trainers: IUser[];
  query = "";
  trainerId = 0;

  searchForm = new FormGroup({
    query: new FormControl(''),
    trainer: new FormControl('')
  });

  constructor(private eventsService: EventsService, private authService: AuthService) { }

  ngOnInit() {
    this.getEvents();
    this.getTrainers();
    this.searchForm.get('query').valueChanges.
      pipe(debounceTime(350)).subscribe((value) => {
        this.query = value;
        this.getEvents();
    });
    this.searchForm.get('trainer').valueChanges.
      subscribe((value) => {
        this.trainerId = value;
        this.getEvents();
    });
  }

  getEvents() {
    this.eventsService.getByName(this.query,true,this.trainerId).subscribe((events) => {
      this.events = events;
    });
  }

  getTrainers() {
    this.authService.getAllTrainers().pipe(take(1)).subscribe((trainers) => {
      this.trainers = trainers;
    });
  }

}
