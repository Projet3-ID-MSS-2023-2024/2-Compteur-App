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
  formValid: boolean = false;

  @Output() sendData: EventEmitter<number> = new EventEmitter<any>();
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.dataSend = this.formBuilder.group({
      facturePrice: ['', [Validators.required, this.numberValidator]]
    })
  }

  numberValidator(control: FormControl) {
    const isNumber = /^\d+$/.test(control.value);
    return isNumber ? null : { numberRequired: true };
  }

  closePopUp(){
    this.closePopup.emit(true);
  }

  dataSender(choice: boolean) {
    if (choice && this.dataSend.valid) {
      this.sendData.emit(this.dataSend.value.facturePrice);
    }else {
      this.formValid = true;
    }
  }

}

