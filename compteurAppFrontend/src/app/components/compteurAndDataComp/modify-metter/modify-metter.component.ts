import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/models/category';
import { UserGet } from 'src/models/user-get';

@Component({
  selector: 'app-modify-metter',
  templateUrl: './modify-metter.component.html',
  styleUrls: ['./modify-metter.component.css']
})
export class ModifyMetterComponent {

  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Input() category:Category[] = [];
  @Input() provider:UserGet[] = [];

  sendData(data:any){
    this.data.emit(data);
  }

}
