import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.css']
})
export class InformationCardComponent {

  @Input() title!: string;
  @Input() description!: string;

}
