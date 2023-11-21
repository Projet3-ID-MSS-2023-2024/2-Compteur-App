import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-pageable',
  templateUrl: './change-pageable.component.html',
  styleUrls: ['./change-pageable.component.css']
})
export class ChangePageableComponent {

  @Input() pageStart!: number;
  @Input() pageEnd!: number;

  @Output() page: EventEmitter<any> = new EventEmitter<any>();

  changePage(data:string){
    this.page.emit(data);
  }

}
