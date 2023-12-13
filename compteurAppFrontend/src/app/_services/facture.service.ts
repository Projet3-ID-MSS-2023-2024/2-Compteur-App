import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Facture} from "../../models/facture";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) { }

  getFactureByClientId(idClient:string, status:String){
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Facture[]>(`/api/facture/${idClient}/${status}`, { headers });
  }
}
