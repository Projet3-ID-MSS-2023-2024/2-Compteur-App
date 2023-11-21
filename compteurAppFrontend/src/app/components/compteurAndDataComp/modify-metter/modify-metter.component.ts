import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-metter',
  templateUrl: './modify-metter.component.html',
  styleUrls: ['./modify-metter.component.css']
})
export class ModifyMetterComponent {

  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Input() category:string[] = [];
  @Input() provider:string[] = [];

  sendData(data:any){
    this.data.emit(data);
  }

}
