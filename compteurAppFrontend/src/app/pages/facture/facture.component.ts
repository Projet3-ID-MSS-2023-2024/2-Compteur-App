import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {CompteurDataService} from "../../_services/compteur-data.service";
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {from, Observable} from "rxjs";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{

  ligneFacture: any[] = [];
  idUserConnecter: any;

  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];

  constructor(private keycloackService: KeycloakService,) {}

  async ngOnInit() {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
      console.log(this.idUserConnecter);

  }

  data: any[][] = [
    [1,"1234SEDER4", 'Compteur 1', 'Fournisseur 1',"9301948485", '01/01/2020', '1000'],
    [2,"1546RFZCRT",'Compteur 2', 'Fournisseur 2', "9301948485",'01/01/2020', '2000'],
    [3,"1GHSXFSTRH",'Compteur 3', 'Fournisseur 3', "9301948485",'01/01/2020', '3000'],
    [4,"12EGYITUBF",'Compteur 4', 'Fournisseur 4',"9301948485", '01/01/2020', '4000'],
    [5,"1FEARTHTH4",'Compteur 5', 'Fournisseur 5', "9301948485",'01/01/2020', '5000'],
  ]

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
}
