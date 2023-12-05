import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Compteur } from 'src/models/compteur';
import { CompteurDTO } from 'src/models/compteurDTO';

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
    return this.http.post<CompteurDTO>(`/api/compteur`, compteur, { headers });
  }

  getCompteurs(id:string){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDTO[]>(`/api/compteur/${id}`, { headers });
  }

  getProvideurCompteur(id:string){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`/api/getProvideurCompteur/${id}`, { headers });
  }

  deleteCompteurs(id:string){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<Compteur>(`/api/compteur/${id}`, { headers });
  }

  updateCompteurs(compteur:Compteur){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<CompteurDTO>(`/api/compteur`, compteur, { headers });
  }
}
