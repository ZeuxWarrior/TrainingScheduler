import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVenue } from './venues';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<IVenue> {
    return this.http.get<IVenue>(`http://localhost:3000/venues/${id}`);
  }

  getByName(text: string): Observable<IVenue[]> {
    return this.http.get<IVenue[]>(`http://localhost:3000/venues?name=${text}`);
  }

  saveVenue(venue: IVenue): Observable<IVenue> {
    if(venue.id) {
      return this.http.put<IVenue>('http://localhost:3000/venues', venue);
    } else {
      return this.http.post<IVenue>('http://localhost:3000/venues', venue);
    }
  }
}
