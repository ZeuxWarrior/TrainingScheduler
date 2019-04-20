import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISchedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<ISchedule> {
    return this.http.get<ISchedule>(`http://localhost:3000/schedule/${id}`);
  }

  getByName(text: string): Observable<ISchedule[]> {
    return this.http.get<ISchedule[]>(`http://localhost:3000/schedule?name=${text}`);
  }

  saveSchedule(schedule: ISchedule) {
    return this.http.post<ISchedule>('http://localhost:3000/schedule', schedule);
  }
}
