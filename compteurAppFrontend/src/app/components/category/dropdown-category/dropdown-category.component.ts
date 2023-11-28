import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-category',
  templateUrl: './dropdown-category.component.html',
  styleUrls: ['./dropdown-category.component.css']
})
export class DropdownCategoryComponent {

  @Input() categories!: {id: string, name: string}[];
  @Output() change = new EventEmitter<string>();

  onChange(target: EventTarget | null) {
    if (target) {
      let selectElement = <HTMLSelectElement>target;
      this.change.emit(selectElement.value);
    }
  }

}
