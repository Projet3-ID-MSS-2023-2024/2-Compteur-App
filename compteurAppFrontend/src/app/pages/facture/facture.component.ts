import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {CompteurDataService} from "../../_services/compteur-data.service";
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {from, lastValueFrom, Observable} from "rxjs";
import {FactureService} from "../../_services/facture.service";
import {CompteurDataReq} from "../../../models/compteurDataReq";
import {Facture} from "../../../models/facture";
import {LoadingService} from "../../_services/loading.service";

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
  device: string = 'desktop';

  showPopUpfiltre: boolean = false;

  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];

  constructor(
    private factureService: FactureService,
    private keycloackService: KeycloakService,
    private loadingService: LoadingService) {}

  async ngOnInit() {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
      this.dataRecue = await this.getFactureByClientId(this.idUserConnecter, "IMPAYER");
      this.data = this.setDataCompteur(this.dataRecue);
      console.log("madata" + this.data);

  }

  async ngAfterViewInit() {
    if (sessionStorage.getItem('paymentSuccess') === 'true') {
      this.loading(true);
      sessionStorage.removeItem('paymentSuccess');
    }else if (sessionStorage.getItem('paymentSuccess') === 'false'){
      this.loading(false);
      sessionStorage.removeItem('paymentSuccess');
    }
  }

  async buttonPress(arrayData: any){
    console.log(arrayData);
    this.ligneFacture= arrayData;
  }

  cacherPopUp(any: any){
    this.ligneFacture = [];
  }

  cacherPopUpFiltre(any: any){
    this.showPopUpfiltre = false;
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

  showPopUpfiltreFct(){
    this.showPopUpfiltre = true;
  }

  loading(payement: boolean){
    this.loadingService.emettreEvenement('loading');
    if (window.innerWidth <= 768) {
      this.device = 'mobile';
    }
    if(payement === true){
      this.loadingService.emettreEvenement('Paiement effectué');
    }else {
      this.loadingService.emettreEvenement('error');
    }

  }
}
