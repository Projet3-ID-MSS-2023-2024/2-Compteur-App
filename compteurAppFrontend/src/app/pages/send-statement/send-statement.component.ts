import { Component } from '@angular/core';

@Component({
  selector: 'app-send-statement',
  templateUrl: './send-statement.component.html',
  styleUrls: ['./send-statement.component.css']
})
export class SendStatementComponent {

  showSendStatement:boolean = false;

  attributLegend = ['Date', 'Montant', 'Statut'];
  buttonOption = ['Envoyer', 'Supprimer'];
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

}
