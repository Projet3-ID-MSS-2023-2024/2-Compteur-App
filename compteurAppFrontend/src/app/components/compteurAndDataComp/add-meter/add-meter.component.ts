import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css']
})
export class AddMeterComponent {

  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Input() category:string[] = [];
  @Input() provider:string[] = [];

  addMeter = new FormGroup({
    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    fournisseur: new FormControl('', Validators.required),
  });

  sendData(){
    if(this.addMeter.valid){
      this.data.emit(this.addMeter.value);
    }
  }

}
