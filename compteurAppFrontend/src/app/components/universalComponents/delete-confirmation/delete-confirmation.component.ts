import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteConfirmation(choice: boolean){
    this.delete.emit(choice);
  }

}
