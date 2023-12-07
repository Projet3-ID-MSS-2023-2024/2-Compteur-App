import { Component } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent {

  //facture: any[];
  showPopup: boolean = false;
  ligneFacture: any[] = [];

  attributLegend =['Nom du compteur', 'Nom du fournisseur', 'Date', 'Prix'];

  data: any[][] = [
    [1,'Compteur 1', 'Fournisseur 1', '01/01/2020', '1000'],
    [2,'Compteur 2', 'Fournisseur 2', '01/01/2020', '2000'],
    [3,'Compteur 3', 'Fournisseur 3', '01/01/2020', '3000'],
    [4,'Compteur 4', 'Fournisseur 4', '01/01/2020', '4000'],
    [5,'Compteur 5', 'Fournisseur 5', '01/01/2020', '5000'],
  ]

  async buttonPress(arrayData: any){
    this.ligneFacture= arrayData;
  }

  cacherPopUp(any: any){
    this.ligneFacture = [];
  }

}
