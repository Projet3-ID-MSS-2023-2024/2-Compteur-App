import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filtre-facture-popup',
  templateUrl: './filtre-facture-popup.component.html',
  styleUrls: ['./filtre-facture-popup.component.css']
})
export class FiltreFacturePopupComponent {

  public dataSend: FormGroup;

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePopupFiltre: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.dataSend = this.formBuilder.group({
      filter: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }



  closePopUpFiltre(){
    this.closePopupFiltre.emit(false);
  }

  dataSender(choice: boolean) {
    let data:any[] ;
    if (choice) {
      data = [this.dataSend.value.filter, this.dataSend.value.date];
      this.sendData.emit(data);
    }
  }
}
