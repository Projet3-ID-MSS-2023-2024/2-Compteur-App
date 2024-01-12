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
  userName: any;
  dataRecue!: any[];
  data!: any[];
  dataFiltre!: any[] ;
  device: string = 'desktop';

  showPopUpfiltre: boolean = false;

  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];

  constructor(
    private factureService: FactureService,
    private keycloackService: KeycloakService,
    private loadingService: LoadingService) {}

  async ngOnInit() {
      let user = await this.getDataUser().toPromise();
      if (user){
        this.idUserConnecter = user.id;
        this.userName = user.username;
      }
      this.dataRecue = await this.getFactureByClientId(this.idUserConnecter, "IMPAYER");
      this.data = this.setDataCompteur(this.dataRecue);
      this.dataFiltre = this.data;
      console.log(this.data);
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
    this.ligneFacture= arrayData;
  }

  cacherPopUp(any: any){
    this.ligneFacture = [];
  }

  cacherPopUpFiltre(any: any){
    this.showPopUpfiltre = false;
  }

  convertirDate(date: string) {
    let [annee, mois, jour] = date.split('-');
    return `${jour}/${mois}/${annee}`;
  }
  getFilterData(data: any){
    console.log(data[0], data[1]);
    this.showPopUpfiltre = false;
    this.dataFiltre = this.filtrerData(data[0], data[1]);
  }

  //prendre les donneee du filtre et filtrer le tableau data
  filtrerData(filtre: any, date: any){
    let filtrer: any[] = [];

    if (date !== '') {
      date = this.convertirDate(date);
    }

    let comparerDernierElement = false;
    if (filtre.includes('€')) {
      filtre = filtre.replace('€', '').trim();
      comparerDernierElement = true;
    }

    for (let ligne of this.data) {
      if (filtre !== '' && date !== '') {
        if (comparerDernierElement ? ligne[ligne.length - 1].toString().toLowerCase() === filtre.toLowerCase() : ligne.slice(0, -1).some((element: any) => element.toString().toLowerCase() === filtre.toLowerCase())) {
          if (ligne.some((element: any) => element.toString().toLowerCase() === date.toLowerCase())) {
            filtrer.push(ligne);
          }
        }
      } else if (filtre !== '' && (comparerDernierElement ? ligne[ligne.length - 1].toString().toLowerCase() === filtre.toLowerCase() : ligne.slice(0, -1).some((element: any) => element.toString().toLowerCase() === filtre.toLowerCase()))) {
        filtrer.push(ligne);
      } else if (date !== '' && ligne.some((element: any) => element.toString().toLowerCase() === date.toLowerCase())) {
        filtrer.push(ligne);
      }
    }
    alert(filtre[4]);

    return filtrer;
  }


  desableFiltre(){
    this.dataFiltre = this.data;
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
