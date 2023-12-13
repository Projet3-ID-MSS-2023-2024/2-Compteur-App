import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent {

  @Input() editedFields: any[] = [];
  @Input() title:string='';

  @Output() acceptChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  acceptChangesButton(){
    this.acceptChanges.emit(true);
  }
  refuseChangesButton(){
    this.acceptChanges.emit(false);
  }
  // Dans votre composant Angular

getObjectProperties(obj: any) {
  return Object.keys(obj);
}


}
