import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { CompteurDataSender } from 'src/models/compteurDataSender';

@Injectable({
  providedIn: 'root',
})
export class CompteurDataService {
  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  addCompteurData(compteurData: CompteurDataSender) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData: FormData = new FormData();
    formData.append('image', compteurData.photo, compteurData.photo.name);
    formData.append('client', compteurData.client);
    formData.append('vendeur', compteurData.provider);
    formData.append('valeur', compteurData.valeur.toString());
    formData.append('idCompteur', compteurData.compteur);
    formData.append('rue', compteurData.rue);
    formData.append('numeros', compteurData.numero);
    formData.append('codePostal', compteurData.codePostal);
    formData.append('ville', compteurData.ville);
    formData.append('pays', compteurData.pays);

    return this.http.post<any>(`/api/createCompteurData`, formData, {
      headers,
    });
  }
}
