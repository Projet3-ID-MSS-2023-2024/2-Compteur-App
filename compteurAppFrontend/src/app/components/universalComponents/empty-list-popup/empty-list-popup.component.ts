import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-empty-list-popup',
  templateUrl: './empty-list-popup.component.html',
  styleUrls: ['./empty-list-popup.component.css']
})
export class EmptyListPopupComponent {
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
