import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/events/events';
import { ScheduleService } from '../schedule.service';
import { EventsService } from 'src/app/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth/auth.service';
import { ISession } from 'src/app/sessions/sessions';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html'
})
export class ScheduleAddComponent implements OnInit {

  event: IEvent;
  sessions: ISession[];
  seats: number;
  canAdd = false;
  errMsg = '';

  constructor(private scheduleService: ScheduleService, private eventsService: EventsService,
              private activeRoute: ActivatedRoute, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.getEvent(+id);
  }

  getEvent(id: number): void {
    this.eventsService.getById(id, true).pipe(take(1)).subscribe(
      (event) => {
        this.event = event;
        this.sessions = event.Sessions;
        this.checkSchedule();
      },
      (error) => {
        console.log('Could not find event by id');
      }
    );
  }

  checkSchedule(): void {
    this.scheduleService.getByName(this.event.name,true).pipe(take(1)).subscribe((schedules) => {
      this.seats = this.event.attendanceLimit - schedules.length;
      if(schedules.find((schedule) => {
          return schedule.userId === this.id;
        }, this.authService.user.getValue())) {
        this.errMsg = 'You are already attending this event.';
      } else if(this.seats <= 0) {
        this.seats = 0;
        this.errMsg = 'This event is completely booked.';
      } else {
        this.canAdd = true;
      }
    });
  }

  save(): void {
    let scheduleToSave = {
      userId: this.authService.user.getValue().id,
      eventId: this.event.id
    };
    this.scheduleService.saveSchedule(scheduleToSave).subscribe(
      (response) => {
          this.router.navigateByUrl('/schedule');
      },
      (error) => {
          console.log('Schedule update failed');
      }
    );
  }
}
