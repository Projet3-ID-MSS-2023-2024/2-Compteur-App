import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { User } from 'src/models/user';
import { UserDB } from 'src/models/userDB';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private readonly keycloak: KeycloakService) { }

  updateUser(user: AddFournisseurSpring | undefined, id: string | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<User>(`/api/user/${id}`, user, { headers });
  }
  getUserByUserName(userName:string | undefined){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserDB>(`/api/getUserByName/${userName}`, { headers });
  }
  getUserByUserId(userName:string | undefined){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserDB>(`/api/userDB/${userName}`, { headers });
  }
  public updateUserDB(id: string | undefined, user: User): Observable<User> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`api/updateUserDB/${id}`, user, { headers });
  }
}
