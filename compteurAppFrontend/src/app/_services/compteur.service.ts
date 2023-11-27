import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Compteur } from 'src/models/compteur';

@Injectable({
  providedIn: 'root'
})
export class CompteurService {

  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  addCompteur(compteur: Compteur) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(`/api/compteur`, compteur, { headers });
  }

  getCompteurs(){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`/api/compteur`, { headers });
  }
}
