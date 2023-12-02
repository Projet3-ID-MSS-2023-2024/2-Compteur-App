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

  attributLegend = ['Date', 'Montant', 'Statut'];
  buttonOption = ['picture.svg', 'facture.svg'];

  traiterFilterChoice:string = 'choiceOne';
  payerFilterChoice:string = 'choiceOne';

  closeOrOpenPicture:boolean = false;

  pageStart:number = 0;
  pageEnd:number = 10;

  idFocus!:number;
  idUserConnecter: any;

  data: any[][] = [
    [1, '2023-11-21', 100.50, 'En cours'],
    [2, '2023-11-22', 75.20, 'Terminé'],
    [3, '2023-11-23', 120.00, 'En attente'],
    [4, '2023-11-24', 50.75, 'Annulé'],
    [1, '2023-11-21', 100.50, 'En cours'],
    [2, '2023-11-22', 75.20, 'Terminé'],
    [3, '2023-11-23', 120.00, 'En attente'],
    [4, '2023-11-24', 50.75, 'Annulé'],
    [1, '2023-11-21', 100.50, 'En cours'],
    [2, '2023-11-22', 75.20, 'Terminé'],
    [3, '2023-11-23', 120.00, 'En attente'],
    [4, '2023-11-24', 50.75, 'Annulé'],
  ];

  constructor(private compteurDataService: CompteurDataService,
    private keycloackService: KeycloakService,
    private loadingService: LoadingService,) {}

  async ngAfterViewInit() {
    this.loadingService.emettreEvenement('loading');
    try {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
      let compteurData:CompteurDataReq[] = await this.getCompteurDataByVendeurIdWithoutFacture(this.idUserConnecter, this.pageStart, this.pageEnd);
      console.log(compteurData);
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

  delete(id: number){}

  searchBarDataReceip(data:any){
    console.log(data);
  }

  traiterFilter(data: string){
    this.traiterFilterChoice = data;
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

  async getCompteurDataByVendeurIdWithoutFacture(idVendeur:string, start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdWithoutFacture(idVendeur, start, end);
    return lastValueFrom(observable);
  }

  async getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur:string, idClient:string,start:number, end:number): Promise<CompteurDataReq[]> {
    const observable = this.compteurDataService.getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur, idClient, start, end);
    return lastValueFrom(observable);
  }

  async getCompteurDataByVendeurIdAndFactureEtat(idVendeur:string, etat:string,start:number, end:number): Promise<CompteurDataReq[]> {
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

}
