import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from './events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getById(id: number, showSessions?: boolean): Observable<IEvent> {
    if (showSessions) {
      return this.http.get<IEvent>(`http://localhost:3000/events/${id}?showSessions=true`);
    } else {
      return this.http.get<IEvent>(`http://localhost:3000/events/${id}`);
    }
  }

  getByName(text: string, active?: boolean, trainerId?: number): Observable<IEvent[]> {
    if (active) {
      if (trainerId) {
        return this.http.get<IEvent[]>(`http://localhost:3000/events?name=${text}&active=true&trainerId=${trainerId}`);
      } else {
        return this.http.get<IEvent[]>(`http://localhost:3000/events?name=${text}&active=true`);
      }
    } else {
      return this.http.get<IEvent[]>(`http://localhost:3000/events?name=${text}`);
    }
  }

  saveEvent(event: IEvent): Observable<IEvent> {
    if(event.id) {
      return this.http.put<IEvent>('http://localhost:3000/events', event);
    } else {
      return this.http.post<IEvent>('http://localhost:3000/events', event);
    }
  }
}
