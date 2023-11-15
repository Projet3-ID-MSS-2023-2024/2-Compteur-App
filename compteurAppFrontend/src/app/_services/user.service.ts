import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  private baseUrl = 'http://localhost:8082/admin/realms/compteurapp/users';

    getUserBySpring(){
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`/api/users`, { headers });
    }

  getUserByEmail(email: string) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`${this.baseUrl}?email=${email}`, { headers });
  }

  addRoleToUser(idUser: string, idRole: string, nameRole: string) {
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    const data = [
      {
        id: idRole,
        name: nameRole,
      },
    ];
    return this.http.post<any>(`${this.baseUrl}/${idUser}/role-mappings/realm`, data, { headers });
  }
}
