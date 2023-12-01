import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private http: HttpClient) { }

  public syncUser(): Observable<string> {
    return this.http.get(`api/syncUser`, {responseType:'text'});
  }

  public getUserById(id: string | undefined): Observable<any> {
    return this.http.get(`api/userDB/${id}`);
  }

}
