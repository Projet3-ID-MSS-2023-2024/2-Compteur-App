import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option-choice',
  templateUrl: './option-choice.component.html',
  styleUrls: ['./option-choice.component.css'],
})
export class OptionChoiceComponent {

  @Input() choiceOne!: string;
  @Input() choiceTwo!: string;
  @Output() choice: EventEmitter<string> = new EventEmitter<string>();

  isActive = true;

  changeChoice(choice: string) {
    this.isActive = !this.isActive;
    this.choice.emit(choice);
  }
}
