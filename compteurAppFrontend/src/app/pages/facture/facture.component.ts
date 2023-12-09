import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent {

  ligneFacture: any[] = [];


  attributLegend =['Numero de la facture','Nom du compteur', 'Nom du fournisseur','Tva fournisseur' , 'Date', 'Prix'];

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

}
