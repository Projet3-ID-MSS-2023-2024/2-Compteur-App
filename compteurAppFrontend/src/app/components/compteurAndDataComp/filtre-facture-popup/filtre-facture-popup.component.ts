import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filtre-facture-popup',
  templateUrl: './filtre-facture-popup.component.html',
  styleUrls: ['./filtre-facture-popup.component.css']
})
export class FiltreFacturePopupComponent {

  public dataSend: FormGroup;

  @Output() sendData: EventEmitter<number> = new EventEmitter<any>();
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
    if (choice) {
      console.log(this.dataSend.value.filter);
      console.log(this.dataSend.value.date);
      //this.sendData.emit(this.dataSend.value.facturePrice);
    }
  }
}
