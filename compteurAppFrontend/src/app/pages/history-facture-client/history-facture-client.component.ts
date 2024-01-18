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

  ligneFacture: Facture | undefined = undefined;
  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];
  buttonOption = ['show.svg'];
  idUserConnecter: any | undefined;
  userName: any | undefined;
  dataRecue: any[] | undefined;
  data: any | undefined;
  dataFiltre!: any[] ;
  showPopUpfiltre: boolean | undefined = false;
  listIsEmpty: boolean = false;

  showReceiptPopup: boolean | undefined = false;

  constructor(
    private factureService: FactureService,
    private keycloackService: KeycloakService,) {}

  async ngOnInit() {
    let user = await this.getDataUser().toPromise();
    if (user){
      this.idUserConnecter = user.id;
      this.userName = user.username;
    }
    this.dataRecue = await this.getFactureByClientId(this.idUserConnecter, "PAYER");
    this.data = this.setDataCompteur(this.dataRecue);
    this.dataFiltre = this.data;
    if(!this.dataFiltre || this.dataFiltre.length === 0){
      this.listIsEmpty = true;
    }

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
      let data = [element.id,element.id, element.nomCompteur,element.nomProvideur,element.TVA, formattedDate, element.prix+' €'];
      factureData.push(data);
      console.log("data" + data);
    });
    return factureData;
  }
  buttonPress(arrayData: any) {
    //retourner le datafiltre en fonction d'un id
    let tabData = this.dataFiltre.filter((element: any) => element[0] === arrayData[1]);
    console.log(tabData);
    this.ligneFacture = new Facture(tabData[0][1], tabData[0][2], tabData[0][3], tabData[0][4], tabData[0][5], tabData[0][6]);
    console.log(this.ligneFacture);
    console.log(arrayData);
    this.showReceiptPopup = true;
  }

  cacherPopUp(any:any){
    this.showReceiptPopup = false;
  }

  cacherPopUpEmptyList(any: any){
    this.listIsEmpty = false;
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

    if(!filtrer|| filtrer.length === 0){
      this.listIsEmpty = true;
    }
    return filtrer;
  }

  desableFiltre(){
    this.dataFiltre = this.data;
  }

  showPopUpfiltreFct(){
    this.showPopUpfiltre = true;
  }
}
