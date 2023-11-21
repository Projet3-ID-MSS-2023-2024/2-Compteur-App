import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient, private readonly keycloak: KeycloakService) { }

  private baseUrl = 'http://localhost:8082/admin/realms/compteurapp/users';

  private getFournisseursUrl = 'http://localhost:8082/admin/realms/compteurapp/groups'

  AddFournisseurSpring(user: AddFournisseurSpring | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(user);
    console.log(headers);
    return this.http.post<AddFournisseurSpring>(`/api/provider`, user, { headers });
  }

  updateFournisseurSpring(user: AddFournisseurSpring | undefined, id: number | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<AddFournisseurSpring>(`/api/provider/${id}`, user, { headers });
  }

  getFournisseurSpring() {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`/api/provider`, { headers });
  }

  deleteFournisseurSpring(id: number | undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`/api/provider/${id}`, { headers });
  }



}
