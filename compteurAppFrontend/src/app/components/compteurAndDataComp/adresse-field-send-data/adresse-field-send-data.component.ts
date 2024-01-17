import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addAdresse } from 'src/models/add-adresse';

@Component({
  selector: 'app-adresse-field-send-data',
  templateUrl: './adresse-field-send-data.component.html',
  styleUrls: ['./adresse-field-send-data.component.css']
})
export class AdresseFieldSendDataComponent {

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  dataSend = new FormGroup({
    pays: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])),
    ville: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])),
    codePostal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(7)])),
    rue: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])),
    numero: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])),

    valeur: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
    photo: new FormControl(''),
  });


  dataSender(choice: boolean) {
    let data: any = [choice];
    if (choice) {
      const photo = document.querySelector(
        'input[formControlName="photo"]'
      ) as HTMLInputElement;
      console.log(this.dataSend.value);
      data.push(photo.files);
      data.push(this.dataSend.value);
    }
    this.sendData.emit(data);
  }

}
