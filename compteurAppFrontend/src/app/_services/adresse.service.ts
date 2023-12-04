import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { addAdresse } from 'src/models/add-adresse';
import { Adresse } from 'src/models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  addAdresse(adresse: addAdresse) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(adresse);
    return this.http.post<any>(`/api/addAdresse`, adresse, { headers });
  }

  getAdresses() {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`/api/getAdresses`, { headers });
  }
  updateAdresse(adresse: Adresse | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<Adresse>(`/api/updateAdresse`, adresse, { headers });
  }
}
