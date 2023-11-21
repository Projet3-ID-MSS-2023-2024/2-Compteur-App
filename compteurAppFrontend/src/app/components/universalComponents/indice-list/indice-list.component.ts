import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-indice-list',
  templateUrl: './indice-list.component.html',
  styleUrls: ['./indice-list.component.css']
})
export class IndiceListComponent {

  @Input() attributLegend!: string[];
  @Input() buttonOption!: string[];
  @Input() data!: any[];

  @Output() buttonPressed: EventEmitter<string> = new EventEmitter<string>();

  buttonPress(arrayData: any){
    this.buttonPressed.emit(arrayData);
  }

}
