import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  constructor(private http: HttpClient) {}

  getLocalisation(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`).pipe(delay(2000));
  }

}
