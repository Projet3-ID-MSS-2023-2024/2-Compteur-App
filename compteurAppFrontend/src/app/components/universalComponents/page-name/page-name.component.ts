import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-name',
  templateUrl: './page-name.component.html',
  styleUrls: ['./page-name.component.css']
})
export class PageNameComponent {

  @Input() pageName!: string;

}
