import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private readonly keycloak: KeycloakService) { }

  updateUserSpring(user: User | undefined, id: number | undefined) {
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
    return this.http.get<User>(`/api/user/${userName}`, { headers });
  }
}
