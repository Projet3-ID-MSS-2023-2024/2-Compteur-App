import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { UserDB } from 'src/models/userDB';

@Injectable({
  providedIn: 'root',
})
export class UserDBService {
  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  public syncUser(): Observable<string> {
    return this.http.get(`api/syncUser`, { responseType: 'text' });
  }

  public getUserById(id: string | undefined): Observable<any> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`api/userDB/${id}`, { headers });
  }

  public getAllProviders(): Observable<any> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`api/listProviders`, { headers });
  }

  public getProviderByUserName(userName: string | null): Observable<any> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`api/getUserByName/${userName}`, { headers });
  }

  public updateUserDB(id: string | undefined, user: UserDB): Observable<any> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`api/updateUserDB/${id}`, user, { headers });
  }
  public hasAddressAndMeter(username: string | undefined) : Observable<any[]> | undefined{
    return this.http.get(`api/hasAddressAndMeter/${username}`) as Observable<any[]>;
  }
}
