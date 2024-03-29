import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addAdresse } from 'src/models/add-adresse';

@Component({
  selector: 'app-send-compteur-data',
  templateUrl: './send-compteur-data.component.html',
  styleUrls: ['./send-compteur-data.component.css'],
})
export class SendCompteurDataComponent {
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  adresse!: addAdresse;

  dataSend = new FormGroup({
    valeur: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
    photo: new FormControl(''),
  });

  async dataSender(choice: boolean) {
    let data: any = [choice];
    if (choice) {
      const photo = document.querySelector(
        'input[formControlName="photo"]'
      ) as HTMLInputElement;
      data.push(photo.files);
      data.push(this.dataSend.value.valeur);
      let adresse = null;
      data.push(adresse);
    }

    console.log(data);
    this.sendData.emit(data);
  }

  getAdresse(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.adresse = new addAdresse(
              data.address.town,
              data.address.country,
              data.address.postcode,
              data.address.road,
              data.address.house_number,
            );
            resolve(this.adresse);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
}
