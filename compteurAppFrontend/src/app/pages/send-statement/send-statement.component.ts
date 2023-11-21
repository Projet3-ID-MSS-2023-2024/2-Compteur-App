import { Component } from '@angular/core';

@Component({
  selector: 'app-send-statement',
  templateUrl: './send-statement.component.html',
  styleUrls: ['./send-statement.component.css']
})
export class SendStatementComponent {

  showSendStatement:boolean = false;
  showPopUpDelete:boolean = false;
  idFocus!:number;

  attributLegend = ['Date', 'Montant', 'Statut'];
  buttonOption = ['edit.svg', 'delete.svg','send.svg'];
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
        break;
      case 'btn2':
        this.showPopUpDelete = true;
        break;
      case 'btn3':
        this.showSendStatement = true;
        break;
    }
    this.idFocus = arrayData[1];
  }

  sendStatement(choice: any){
    console.log(choice);
    console.log(this.idFocus);
    this.showSendStatement = false;
  }

  deleteChoice(choice: boolean){
    console.log(choice);
    console.log(this.idFocus);
    this.showPopUpDelete = false;
  }

}
