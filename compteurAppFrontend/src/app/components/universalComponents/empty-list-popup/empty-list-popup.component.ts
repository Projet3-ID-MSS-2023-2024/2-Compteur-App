import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-empty-list-popup',
  templateUrl: './empty-list-popup.component.html',
  styleUrls: ['./empty-list-popup.component.css']
})
export class EmptyListPopupComponent {
  @Output() cacherPopUpEmptyList: EventEmitter<any> = new EventEmitter<any>();
  cacherPopUp(){
    this.cacherPopUpEmptyList.emit(false);
  }
}
