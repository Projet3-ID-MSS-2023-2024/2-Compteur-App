import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-empty-list-popup-historique',
  templateUrl: './empty-list-popup.component-historique.html',
  styleUrls: ['./empty-list-popup.component-historique.css']
})
export class EmptyListPopupComponentHistorique {
  @Output() cacherPopUpEmptyList: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: Router
  ) { }

    goToGererCompteur(){
      this.route.navigate(['/send-statement']);
    }

  cacherPopUp(){
    this.cacherPopUpEmptyList.emit(false);
  }
}
