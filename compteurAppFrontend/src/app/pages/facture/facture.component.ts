import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {CompteurDataService} from "../../_services/compteur-data.service";
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {from, lastValueFrom, Observable} from "rxjs";
import {FactureService} from "../../_services/facture.service";
import {CompteurDataReq} from "../../../models/compteurDataReq";
import {Facture} from "../../../models/facture";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{

  ligneFacture: any[] = [];
  idUserConnecter: any;
  dataRecue!: any[];
  data!: any[];

  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];

  constructor(
    private factureService: FactureService,
    private keycloackService: KeycloakService,) {}

  async ngOnInit() {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
      this.dataRecue = await this.getFactureByClientId(this.idUserConnecter, "IMPAYER");
      this.data = this.setDataCompteur(this.dataRecue);
      console.log("madata" + this.data);

  }

  async buttonPress(arrayData: any){
    console.log(arrayData);
    this.ligneFacture= arrayData;
  }

  cacherPopUp(any: any){
    this.ligneFacture = [];
  }

  getDataUser(): Observable<KeycloakProfile> {
    console.log(this.keycloackService.loadUserProfile());
    return from(this.keycloackService.loadUserProfile());
  }

  async getFactureByClientId(idClient:string, status:string){
    const observable = this.factureService.getFactureByClientId(idClient, status);
    return lastValueFrom(observable);
  }

  private formatDate(dateAForm: String): string {
    const date = new Date(dateAForm as string);
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();

   return `${day}-${month}-${year}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  setDataCompteur(factureDataReq:Facture[]){
    //ON ADAPTE LA LEGENDE DE LA LISTE
    let factureData: any[][] = [];


    //FORMATAGE DES DONNEES
    factureDataReq.forEach(element => {
      //console.log("date" + element.date);
      let date = new Date(element.date as string);
      let formattedDate = date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
      let data = [element.id,element.id, element.nomCompteur,element.nomProvideur,element.TVA, formattedDate, element.prix];
      factureData.push(data);
      console.log("data" + data);
    });
    return factureData;
  }
}
