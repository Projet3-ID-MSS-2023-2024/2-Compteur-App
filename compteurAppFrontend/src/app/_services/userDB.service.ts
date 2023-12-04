import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDB } from 'src/models/userDB';

@Injectable({
  providedIn: 'root'
})
export class UserDBService {

  constructor(private http: HttpClient) { }

  public syncUser(): Observable<string> {
    return this.http.get(`api/syncUser`, {responseType:'text'});
  }

  public getUserById(id: string | undefined): Observable<any> {
    return this.http.get(`api/userDB/${id}`);
  }

  public getAllProviders(): Observable<any> {
    return this.http.get(`api/listProviders`);
  }

  public getProviderByUserName(userName: string | null): Observable<any> {
    return this.http.get(`api/getUserByName/${userName}`);
  }

  public updateUserDB(id: string | undefined, user: UserDB): Observable<any> {
    console.log(user);
    return this.http.put(`api/updateUserDB/${id}`, user);
  }
}
