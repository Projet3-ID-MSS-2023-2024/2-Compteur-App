import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalisationService } from 'src/app/_services/localisation.service';
import { Adresse } from 'src/app/models/adressModel';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css'],
})
export class AddMeterComponent {
  @Output() data: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() category: string[] = [];
  @Input() provider: string[] = [];
  adresse!:Adresse;

  addMeter = new FormGroup({
    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    fournisseur: new FormControl('', Validators.required),
  });

  constructor(private localisationService: LocalisationService) {}

  async sendData() {
    if (this.addMeter.valid) {
      await this.getAdresse();
      let data = [this.addMeter.value, this.adresse]
      this.data.emit(data);
    }
  }

  getAdresse(): Promise<any> {
    const observable = this.localisationService.getLocalisation(50.4169699, 4.3252908);
    return firstValueFrom(observable)
      .then((data) => {
        this.adresse = new Adresse(data.address.town, data.address.country, data.address.postcode, data.address.road, data.address.house_number);
      });
  }
}
