import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { addAdresse } from 'src/models/add-adresse';
import { Adresse } from 'src/models/adresse';
import { AdresseDTO } from 'src/models/adresseDTO';

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

  getAdresseByUserName(username:string |undefined) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Adresse>(`/api/getAdresseByUsername/${username}`, { headers })
  }
  updateAdresse(adresse:AdresseDTO){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<AdresseDTO>(`/api/updateAdresse`,adresse, { headers })
  }
  getAdresses(){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Adresse>(`/api/getAdresses`, { headers })
  }
}
