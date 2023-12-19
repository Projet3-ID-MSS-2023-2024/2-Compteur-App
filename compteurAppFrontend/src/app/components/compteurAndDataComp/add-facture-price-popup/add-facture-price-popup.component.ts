import {Component, EventEmitter, Output} from '@angular/core';
import {FactureDTO} from "../../../../models/factureDTO";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-add-facture-price-popup',
  templateUrl: './add-facture-price-popup.component.html',
  styleUrls: ['./add-facture-price-popup.component.css']
})
export class AddFacturePricePopupComponent {

  public dataSend: FormGroup;

  @Output() sendData: EventEmitter<number> = new EventEmitter<any>();
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.dataSend = this.formBuilder.group({
      facturePrice: ['', [Validators.required]]
    })
  }



  closePopUp(){
    this.closePopup.emit(true);
  }

  dataSender(choice: boolean) {
    if (choice) {
      this.sendData.emit(this.dataSend.value.facturePrice);
    }
  }

}

