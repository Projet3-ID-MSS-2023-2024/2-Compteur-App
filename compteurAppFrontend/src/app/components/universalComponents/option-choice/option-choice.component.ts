import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option-choice',
  templateUrl: './option-choice.component.html',
  styleUrls: ['./option-choice.component.css']
})
export class OptionChoiceComponent {

  @Input() choiceOne!: string;
  @Input() choiceTwo!: string;

}
