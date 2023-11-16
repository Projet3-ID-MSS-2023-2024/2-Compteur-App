import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,private readonly keycloak: KeycloakService) {}

  asignClientRole(id: string | undefined, role: string | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(`/api/asignRole/${id}/${role}`, {}, { headers });
  }
}
