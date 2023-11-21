import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-indice',
  templateUrl: './list-indice.component.html',
  styleUrls: ['./list-indice.component.css']
})
export class ListIndiceComponent {

  @Input() title!: string;
  @Output() buttonPressed: EventEmitter<string> = new EventEmitter<string>();

  buttonPress(btn: string){
    this.buttonPressed.emit(btn);
  }

}
