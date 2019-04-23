import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../schedule';
import { FormGroup, FormControl } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { take, debounceTime } from 'rxjs/operators';
import { ISession } from 'src/app/sessions/sessions';
import { IEvent } from 'src/app/events/events';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html'
})
export class ScheduleListComponent implements OnInit {

  events: IEvent[];
  query = '';

  searchForm = new FormGroup({
    query: new FormControl('')
  });

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getSchedule();
    this.searchForm.get('query').valueChanges.
      pipe(debounceTime(350)).subscribe((value) => {
        this.query = value;
        this.getSchedule();
      });
  }

  getSchedule() {
    this.scheduleService.getByName(this.query).pipe(take(1)).subscribe((schedule) => {
      this.events = schedule.map(this.getEvent);
    });
  }

  getEvent(item: ISchedule): IEvent {
    return item.Events;
  }

  isEventOngoing(sessions: ISession[]): boolean {
    let lastSession = sessions[sessions.length-1];
    return lastSession.endTime >= new Date();
  }

}
