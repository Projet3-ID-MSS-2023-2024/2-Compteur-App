import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { CompteurDataSender } from 'src/models/compteurDataSender';
import { CompteurDataReq } from 'src/models/compteurDataReq';

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
    formData.append('device', compteurData.device);

    return this.http.post<any>(`/api/createCompteurData`, formData, {
      headers,
    });
  }

  getCompteurDataById(id:string){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq>(`/api/CompteurData/${id}`, { headers });
  }

  getCompteurDataByClientId(idClient:string, start:number, end:number){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq[]>(`/api/getCompteurDataByClientId/${idClient}/${start}/${end}`, { headers });
  }

  getCompteurDataByVendeurIdWithoutFacture(idVendeur:string, start:number, end:number){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq[]>(`/api/getCompteurDataByVendeurIdWithoutFacture/${idVendeur}/${start}/${end}`, { headers });
  }

  getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur:string, idClient:string,start:number, end:number){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq[]>(`/api/getCompteurDataByVendeurIdAndClientIdWithoutFacture/${idVendeur}/${idClient}/${start}/${end}`, { headers });
  }

  getCompteurDataByVendeurIdAndFactureEtat(idVendeur:string, etat:string,start:number, end:number){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq[]>(`/api/getCompteurDataByVendeurIdAndFactureEtat/${idVendeur}/${etat}/${start}/${end}`, { headers });
  }

  getCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur:string, idClient:string, etat:string, start:number, end:number){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<CompteurDataReq[]>(`/api/getCompteurDataByVendeurIdAndClientIdAndFactureEtat/${idVendeur}/${idClient}/${etat}/${start}/${end}`, { headers });
  }

}
