import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-indice',
  templateUrl: './list-indice.component.html',
  styleUrls: ['./list-indice.component.css']
})
export class ListIndiceComponent {

  @Input() title!: string;

}
