import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-compteur-data',
  templateUrl: './send-compteur-data.component.html',
  styleUrls: ['./send-compteur-data.component.css'],
})
export class SendCompteurDataComponent {
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  dataSend = new FormGroup({
    valeur: new FormControl('', Validators.required),
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
