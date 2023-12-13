import {Component, OnInit} from '@angular/core';
import {FactureService} from "../../_services/facture.service";
import {KeycloakService} from "keycloak-angular";
import {from, lastValueFrom, Observable} from "rxjs";
import {KeycloakProfile} from "keycloak-js";
import {Facture} from "../../../models/facture";

@Component({
  selector: 'app-history-facture-client',
  templateUrl: './history-facture-client.component.html',
  styleUrls: ['./history-facture-client.component.css']
})
export class HistoryFactureClientComponent implements OnInit{

  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];
  buttonOption = ['show.svg'];
  idUserConnecter: any;
  dataRecue!: any[];
  data!: any[];


  constructor(
    private factureService: FactureService,
    private keycloackService: KeycloakService,) {}

  async ngOnInit() {
    let user = await this.getDataUser().toPromise();
    if (user) this.idUserConnecter = user.id;
    this.dataRecue = await this.getFactureByClientId(this.idUserConnecter, "PAYER");
    this.data = this.setDataCompteur(this.dataRecue);
    console.log("madata" + this.data);

  }

  getDataUser(): Observable<KeycloakProfile> {
    console.log(this.keycloackService.loadUserProfile());
    return from(this.keycloackService.loadUserProfile());
  }

  async getFactureByClientId(idClient:string, status:string){
    const observable = this.factureService.getFactureByClientId(idClient, status);
    return lastValueFrom(observable);
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
  buttonPress(arrayData: any) {
    //methode pour generer pdf
    console.log(arrayData);
  }
}
