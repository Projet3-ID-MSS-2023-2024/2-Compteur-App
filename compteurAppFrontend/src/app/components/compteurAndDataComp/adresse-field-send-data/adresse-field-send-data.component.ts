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
    pays: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    codePostal: new FormControl('', Validators.required),
    rue: new FormControl('', Validators.required),
    numeros: new FormControl('', Validators.required),

    valeur: new FormControl('', Validators.required),
    photo: new FormControl(''),
  });

  dataSender(choice: boolean) {
    let data: any = [choice];
    if (choice) {
      const photo = document.querySelector(
        'input[formControlName="photo"]'
      ) as HTMLInputElement;
      data.push(photo.files);
      data.push(this.dataSend.value.valeur);
    }
    this.sendData.emit(data);
  }

}
