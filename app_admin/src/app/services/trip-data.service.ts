import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly baseUrl = 'http://localhost:3000/api/trips'; // <- EXACT

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${encodeURIComponent(code)}`);
  }

  addTrip(trip: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip);
  }

  updateTrip(trip: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${encodeURIComponent(trip.code)}`, trip);
  }
}
