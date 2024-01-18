import { Component } from '@angular/core';
import { CompteurDataService } from 'src/app/_services/compteur-data.service';
import { CompteurDataReq } from 'src/models/compteurDataReq';
import { Observable, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';
import { LoadingService } from 'src/app/_services/loading.service';
import {FactureDTO} from "../../../models/factureDTO";
import {FactureService} from "../../_services/facture.service";
import {MailService} from "../../_services/mail.service";
import {UserService} from "../../_services/user.service";
import {User} from "../../../models/user";
import {UserDB} from "../../../models/userDB";

@Component({
  selector: 'app-received-statement',
  templateUrl: './received-statement.component.html',
  styleUrls: ['./received-statement.component.css']
})
export class ReceivedStatementComponent {

  attributLegend = ['Nom Client', 'Valeur', 'Date', 'Etat'];

  buttonOption = ['picture.svg', 'facture.svg'];

  traiterFilterChoice:string = 'choiceOne';
  payerFilterChoice:string = 'choiceOne';

  closeOrOpenPicture:boolean = false;
  closeOrOpenFacturePopUp:boolean = false;

  pageStart:number = 0;
  pageEnd:number = 10;

  idFocus!:number;
  idUserConnecter: any;

  data: any[][] = [];
  pageActuelle!: string;
  stop: boolean = false;

  dataCompteurNonTraiter: any[][] = [];
  dataCompteurTraiterPayer: any[][] = [];
  dataCompteurTraiterImpayer: any[][] = [];

  historyPagedataCompteurNonTraiter: any[][] = [];
  historyPagedataCompteurTraiterPayer: any[][] = [];
  historyPagedataCompteurTraiterImpayer: any[][] = [];

  photoCompteur!: string;

  facture!: FactureDTO;
  compteurDataNumber!: number;

  clientMail!: string;
  clientName!: string;

  constructor(private compteurDataService: CompteurDataService,
    private factureService: FactureService,
    private keycloackService: KeycloakService,
    private userService: UserService,
    private loadingService: LoadingService,
              private mailService: MailService,) {}

  async ngAfterViewInit() {
    this.loadingService.emettreEvenement('loading');
    try {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
      this.mainFunctionShowData('Non traité');
      this.loadingService.emettreEvenement('sucess');
    } catch {
      this.loadingService.emettreEvenement('error');
    }
  }



  async buttonPress(arrayData: any){
    switch(arrayData[0]){
      case 'btn1':
        this.closeOrOpenPicture = true;
        break;
      case 'btn2':
        //this.fillFactureData();
        //console.log(this.facture);
        this.closeOrOpenFacturePopUp = true;
        this.compteurDataNumber = arrayData[1];
        break;
    }
    this.idFocus = arrayData[1];
    this.photoCompteur = (await this.getCompteurById(arrayData[1].toString())).photo;

  }

  async fillFactureData(price: any){
    this.facture = new FactureDTO('IMPAYER', price, this.compteurDataNumber);
    await this.addFacture(this.facture);
    let compteurData:any = await this.getCompteurDataForGetClientId(this.facture.idCompteurData!.toString());
    this.clientMail = compteurData.client.email;
    this.clientName= compteurData.client.firstname;
    this.sendEmail(this.clientMail, this.clientName);
    location.reload();
  }



  //FILTRER LES COMPTEURSDATA PAS TRAITER/TRAITER
  async traiterFilter(data: string){
    this.traiterFilterChoice = data;
    this.pageStart = 0;
    this.stop = false;
    data = data == 'choiceOne' ? 'Non traité' : 'Impayé';
    await this.mainFunctionShowData(data);
  }

  //FILTRER LES COMPTEURSDATA PAS IMPAYER/PAYER
  async payerFilter(data: string){
    this.payerFilterChoice = data;
    this.pageStart = 0;
    this.stop = false;
    data = data == 'choiceOne' ? 'Impayé' : 'Payé';
    await this.mainFunctionShowData(data);
  }

  closePicture(close:boolean){
    this.closeOrOpenPicture = false;
  }

  closePopUp(close:boolean){
    this.closeOrOpenFacturePopUp = false;
  }

  priceData(price: any){
    this.closeOrOpenFacturePopUp = false;
   this.fillFactureData(price);
  }

  //CHANGEMENT DE PAGES
  changePage(data:string){
    switch(data){
      case 'next':
        if(!this.stop){
        this.pageStart += 1;
        }
        break;
      case 'previous':
        if(this.pageStart > 0){
          this.pageStart -= 1;
          this.stop = false;
        }
        break;
    }
    this.mainFunctionShowData(this.pageActuelle);
  }

  /**/
  /* FONCTION PRINCIPALE */
  /* PARMIS 3 CHOIX : Non traité, Payé, Impayé */
  /* ON VA AFFICHER SUR LA PAGE LES DONNNES CORRESPONDANTES */
  /**/
  async mainFunctionShowData(page:string){
    let data: any[][] = [];
    switch(page){
      case 'Non traité':
        if (!this.historyPagedataCompteurNonTraiter.some(arr => arr[0] === this.pageStart && arr[1] === true)) {
          await this.fillMeterData(false, false);
        }
        data = this.dataCompteurNonTraiter;
        break;
      case 'Payé':
        if (!this.historyPagedataCompteurTraiterPayer.some(arr => arr[0] === this.pageStart && arr[1] === true)) {
        await this.fillMeterData(true, true);
        }
        data = this.dataCompteurTraiterPayer;
        break;
      case 'Impayé':
        if (!this.historyPagedataCompteurTraiterImpayer.some(arr => arr[0] === this.pageStart && arr[1] === true)) {
          await this.fillMeterData(true, false);
        }
        data = this.dataCompteurTraiterImpayer;
        break;
    }
    this.transferDataSlice(data);
    this.pageActuelle = page;
  }



  /**/
  /* FONCTION RECUPERER DONNEE ET GARDIR HISTORIQUE */
  /* ON RECUPERE LES DONNEES ET ON LES GARDENT DANS UN TABLEAU */
  /* ON GARDE AUSSI L'HISTORIQUE DES PAGES POUR EVITER LES APPELLES BD INUTILE*/
  /**/
  async fillMeterData(traiter:boolean, payer:boolean){
    let compteurDataReq:CompteurDataReq[] = [];
    let historyPageable: any[] = [];
    let dataCompteur, historyPagedataCompteur;

    try{
      compteurDataReq = traiter ? await this.FactureEtat(this.idUserConnecter, payer ? 'PAYER' : 'IMPAYER', this.pageStart, 10) : await this.WithoutFacture(this.idUserConnecter, this.pageStart, 10);
      historyPageable = [this.pageStart, true];
    }
    catch{
      historyPageable = [this.pageStart, false];
      this.stop = true;
      this.pageStart -= 1;
    }

    if(!traiter){
      dataCompteur = this.dataCompteurNonTraiter;
      historyPagedataCompteur = this.historyPagedataCompteurNonTraiter;
    }
    else{
      dataCompteur = payer ? this.dataCompteurTraiterPayer : this.dataCompteurTraiterImpayer;
      historyPagedataCompteur = payer ? this.historyPagedataCompteurTraiterPayer : this.historyPagedataCompteurTraiterImpayer;
    }

    this.setDataCompteur(compteurDataReq, traiter, payer).forEach(element => {
      dataCompteur.push([element]);
    });
    historyPagedataCompteur.push(historyPageable);
  }


  /**/
  /* FONCTION FORMATAGE DONNEE */
  /* ON FORMATE LES DONNEES POUR L'AFFICHAGE */
  /**/
  setDataCompteur(compteurDataReq:CompteurDataReq[], traiter:boolean, payer:boolean){
    //ON ADAPTE LA LEGENDE DE LA LISTE
    let compteurData: any[][] = [];

    //FORMATAGE DES DONNEES
    compteurDataReq.forEach(element => {
      let date = new Date(element.date);
      let formattedDate = date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      let data = [element.id, element.client, element.valeur, formattedDate];
      if(traiter){
        let etat = payer ? "Payé" : "Impayé";
        data.push(etat);
      }
      else{
        data.push("Non traité");
      }
      compteurData.push(data);
    });
    return compteurData;
  }


  /**/
  /* FONCTION TRANSFERT DONNEE FORMATER VERS DONNEE AFFICHER */
  /**/
  transferDataSlice(arrayCompteurData:any[][]) {
    //On transfert les dataCompteur dans data
    this.data = [];
    let end = this.pageStart == 0 ? 10 : (this.pageStart*10)+10;
    let slice = arrayCompteurData.slice(this.pageStart*10, end);
    slice.forEach(element => {
      element.forEach(element2 => {
        this.data.push(element2);
      });
    });
  }

  /**/
  /* FONCTION d'envoie de mail au client*/
  /**/
  sendEmail(mail:string, clientName: string) {
    const object = 'Nouvelle facture disponible';
    const message = 'Bonjour'+' '+ clientName+ ', une nouvelle facture est disponible dans l’onglet Facture de votre CompteurApp.';
    this.mailService.sendMail(mail, object, message).subscribe(response => {
     console.log(response);
    } );

  }


  /*#############################*/
  /* METHODE APPELLE SERVICES */
  /*#############################*/

  async getCompteurDataByClientId(idClient:string, start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByClientId(idClient, start, end);
    return lastValueFrom(observable);
  }

  async WithoutFacture(idVendeur:string, start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdWithoutFacture(idVendeur, start, end);
    return lastValueFrom(observable);
  }

  async getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur:string, idClient:string,start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur, idClient, start, end);
    return lastValueFrom(observable);
  }

  async FactureEtat(idVendeur:string, etat:string,start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdAndFactureEtat(idVendeur, etat,start, end);
    return lastValueFrom(observable);
  }

  async getCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur:string, idClient:string, etat:string, start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur, idClient, etat, start, end);
    return lastValueFrom(observable);
  }

  getDataUser(): Observable<KeycloakProfile> {
    return from(this.keycloackService.loadUserProfile());
  }

  getCompteurById(id:string): Promise<CompteurDataReq> {
    const observable = this.compteurDataService.getCompteurDataById(id);
    return lastValueFrom(observable);
  }

  addFacture(facture: FactureDTO): Promise<FactureDTO> {
    const observable = this.factureService.addFacture(facture);
    return lastValueFrom(observable);
  }

  getCompteurDataForGetClientId(id:string): Promise<CompteurDataReq> {
    const observable = this.compteurDataService.getCompteurDataNoDTO(id);
    return lastValueFrom(observable);
  }
}
