import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.css']
})
export class InformationPageComponent {

  @Input() title!: string[];
  @Input() description!: string[];

}
