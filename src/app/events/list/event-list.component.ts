import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { IEvent } from '../events';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {

  events: IEvent[];
  query = '';

  searchForm = new FormGroup({
    query: new FormControl(this.query)
  });

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
    this.searchForm.get('query').valueChanges.
      pipe(debounceTime(350)).subscribe((value) => {
        this.query = value;
        this.getEvents();
      });
  }

  getEvents() {
    this.eventsService.getByName(this.query).subscribe((events) => {
      this.events = events;
    });
  }

}
