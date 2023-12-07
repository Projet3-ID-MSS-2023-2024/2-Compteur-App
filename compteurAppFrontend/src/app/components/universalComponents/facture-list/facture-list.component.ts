import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent {
  @Input() attributLegend!: string[];
  @Input() data!: any[];

  @Output() buttonPressed: EventEmitter<any> = new EventEmitter<any>();

  buttonPress(any: any){
    console.log(any);
    this.buttonPressed.emit(any);
  }

}
