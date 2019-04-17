import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISession } from './sessions';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<ISession> {
    return this.http.get<ISession>(`http://localhost:3000/sessions/${id}`);
  }

  getByName(text: string): Observable<ISession[]> {
    return this.http.get<ISession[]>(`http://localhost:3000/sessions?name=${text}`);
  }

  saveSession(session: ISession) {
    if(session.id) {
      return this.http.put<ISession>('http://localhost:3000/sessions', session);
    } else {
      return this.http.post<ISession>('http://localhost:3000/sessions', session);
    }
  }
}
