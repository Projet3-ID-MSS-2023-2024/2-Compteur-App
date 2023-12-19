import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-shopping-btn',
  templateUrl: './shopping-btn.component.html',
  styleUrls: ['./shopping-btn.component.css']
})
export class ShoppingBtnComponent implements AfterViewInit{
  @Input() indiceArray: any[] = [];
  @Input() legend!:boolean;

  @ViewChildren('indices') indices!: QueryList<ElementRef>;
  @ViewChildren('text') text!: QueryList<ElementRef>;
  @ViewChild('indiceButton') indiceButton!: ElementRef;

  @Output() buttonPressed: EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit(): void {
    console.log(this.indiceArray);
    let sizeMax = 90;
    let size = sizeMax / this.indiceArray.length;
    this.indices.forEach((element) => {
      element.nativeElement.style.width = size + '%';
    });
    this.text.forEach((element) => {
      element.nativeElement.style.color = this.legend ? 'rgba(0, 0, 0, 0.500)' : '#3a475b ';
    });
  }

  buttonPress(any: any){
    this.buttonPressed.emit(this.indiceArray);
  }
}
