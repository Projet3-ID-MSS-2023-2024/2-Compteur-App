import {
  Component,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addAdresse } from 'src/models/add-adresse';
import { LoadingService } from 'src/app/_services/loading.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Category } from 'src/models/category';
import { User } from 'src/models/user';
import { UserDB } from 'src/models/userDB';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css'],
})
export class AddMeterComponent {
  @Output() data: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() category: Category[] = [];
  @Input() provider: UserDB[] = [];
  adresse!: addAdresse;

  addMeter = new FormGroup({
    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    fournisseur: new FormControl('', Validators.required),
  });

  constructor(
    private loadingService: LoadingService
  ) {}

  async sendData() {
    if (this.addMeter.valid) {
      try {
        this.loadingService.emettreEvenement('loading');
        await this.getAdresse();
        let data = [this.addMeter.value, this.adresse];
        this.data.emit(data);
      } catch (error) {
        this.loadingService.emettreEvenement('error');
      }
    }
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
