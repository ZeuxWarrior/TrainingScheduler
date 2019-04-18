import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEvent } from '../events';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    startDate: new FormControl('', Validators.required),
    price: new FormControl(0,Validators.min(0)),
    attendanceLimit: new FormControl(10, Validators.min(1))
  });

  saved = false;

  event: IEvent;

  constructor(private eventsService: EventsService, private activeRoute: ActivatedRoute) { }

  get name() {
    return this.eventForm.get('name');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get startDate() {
    return this.eventForm.get('startDate');
  }

  get price() {
    return this.eventForm.get('price');
  }

  get attendanceLimit() {
    return this.eventForm.get('attendanceLimit');
  }


  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id !== 'add') {
      this.getEvent(+id);
    }
  }

  getEvent(id: number): void {
    this.eventsService.getById(id).subscribe(
      (event) => {
        this.event = event;
        this.eventForm.patchValue(event);
      },
      (error) => {
        console.log('Could not find event by id');
      }
    );
  }

  save(): void {
    let eventToSave = this.eventForm.value;
    eventToSave.id = this.event ? this.event.id : 0;
    this.eventsService.saveEvent(eventToSave).subscribe(
      (response) => {
        this.saved = true;
        setTimeout(() => {
          this.saved = false;
        }, 3000);
      },
      (error) => {
        console.log('Event failed to save');
      }
    );
  }

}
