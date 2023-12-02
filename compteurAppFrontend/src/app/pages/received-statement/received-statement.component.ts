import { Component } from '@angular/core';

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


}
