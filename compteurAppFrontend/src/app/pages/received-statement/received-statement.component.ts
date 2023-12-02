import { Component } from '@angular/core';
import { CompteurDataService } from 'src/app/_services/compteur-data.service';
import { CompteurDataReq } from 'src/models/compteurDataReq';
import { Observable, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-received-statement',
  templateUrl: './received-statement.component.html',
  styleUrls: ['./received-statement.component.css']
})
export class ReceivedStatementComponent {

  attributLegend = ['Nom Client', 'Valeur', 'Date'];

  buttonOption = ['picture.svg', 'facture.svg'];

  traiterFilterChoice:string = 'choiceOne';
  payerFilterChoice:string = 'choiceOne';

  closeOrOpenPicture:boolean = false;

  pageStart:number = 0;
  pageEnd:number = 10;

  idFocus!:number;
  idUserConnecter: any;

  data: any[][] = [];

  dataCompteurNonTraiter: any[][] = [];
  dataCompteurTraiterPayer: any[][] = [];
  dataCompteurTraiterImpayer: any[][] = [];

  historyPagedataCompteurNonTraiter: any[][] = [];
  historyPagedataCompteurTraiterPayer: any[][] = [];
  historyPagedataCompteurTraiterImpayer: any[][] = [];

  constructor(private compteurDataService: CompteurDataService,
    private keycloackService: KeycloakService,
    private loadingService: LoadingService,) {}

  async ngAfterViewInit() {
    this.loadingService.emettreEvenement('loading');
    try {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;

      let compteurData:CompteurDataReq[] = await this.WithoutFacture(this.idUserConnecter, this.pageStart, this.pageEnd);
      this.dataCompteurNonTraiter = this.setDataCompteur(compteurData, false, false);
      this.transferDataSlice(this.dataCompteurNonTraiter);


      this.loadingService.emettreEvenement('sucess');
    } catch {
      this.loadingService.emettreEvenement('error');
    }
  }



  buttonPress(arrayData: any){
    switch(arrayData[0]){
      case 'btn1':
        this.closeOrOpenPicture = true;
        break;
      case 'btn2':
        break;
    }
    this.idFocus = arrayData[1];
  }


  searchBarDataReceip(data:any){
    console.log(data);
  }

  traiterFilter(data: string){
    this.traiterFilterChoice = data;
    console.log(data);
    switch(data){
      case 'choiceOne':


        break;
      case 'choiceTwo':


        break;
    }
  }

  payerFilter(data: string){
    this.payerFilterChoice = data;
  }

  closePicture(close:boolean){
    this.closeOrOpenPicture = false;
  }

  changePage(data:string){
    switch(data){
      case 'next':
        this.pageStart += 10;
        this.pageEnd += 10;
        break;
      case 'previous':
        if(this.pageStart > 0){
          this.pageStart -= 10;
          this.pageEnd -= 10;
        }
        break;
    }
  }

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

  setDataCompteur(compteurDataReq:CompteurDataReq[], traiter:boolean, payer:boolean){
    let compteurData: any[][] = [];
    let attributLegendNonTraiter = ['Nom Client', 'Valeur', 'Date'];
    let attributLegendTraiter = ['Nom Client', 'Valeur', 'Date', 'Etat'];
    this.attributLegend = traiter ? attributLegendTraiter : attributLegendNonTraiter;
    compteurDataReq.forEach(element => {
      let date = new Date(element.date);
      let formattedDate = date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      let data = [element.id, element.client, element.valeur, formattedDate];
      if(traiter){
        let etat = payer ? "Payé" : "Impayé";
        data.push(etat);
      }
      compteurData.push(data);
  });
  return compteurData;
  }

  transferDataSlice(arrayCompteurData:any[][]) {
    this.data = [];
    let slice = arrayCompteurData.slice(this.pageStart, this.pageEnd);
    for (let element of slice) {
        this.data.push(element);
    }
  }

  async fillMeterData(traiter:boolean, payer:boolean){
    let compteurDataReq:Promise<CompteurDataReq[]> = traiter ? await this.WithoutFacture(this.idUserConnecter, this.pageStart, this.pageEnd) : await this.FactureEtat(this.idUserConnecter, payer ? 'Payé' : 'Impayé', this.pageStart, this.pageEnd);
    
  }


}
