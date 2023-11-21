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

  buttonPress(button: string){
    console.log('button press');
  }

}
