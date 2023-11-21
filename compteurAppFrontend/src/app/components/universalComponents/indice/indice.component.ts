import { Component, Input, OnInit, ViewChildren, AfterViewInit, ElementRef, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements AfterViewInit{

  @Input() indiceArray: any[] = [];
  @Input() legend!:boolean;

  @Input() buttonOption!: string[];

  @Output() buttonPressed: EventEmitter<string> = new EventEmitter<string>();

  @ViewChildren('indices') indices!: QueryList<ElementRef>;
  @ViewChildren('text') text!: QueryList<ElementRef>;
  @ViewChild('indiceButton') indiceButton!: ElementRef;
  openLanguette: boolean = false;
  @ViewChild('languette') languette!: ElementRef;

  /* Set size of an indice to perfect size */
  ngAfterViewInit(): void {
      let sizeMax = 90;
      let size = sizeMax / this.indiceArray.length;
      this.indices.forEach((element) => {
        element.nativeElement.style.width = size + '%';
      });
      this.text.forEach((element) => {
        element.nativeElement.style.color = this.legend ? 'rgba(0, 0, 0, 0.500)' : '#3a475b ';
      });
  }

  openCloseLanguette(){
    this.languette.nativeElement.style.transform = this.openLanguette ? 'translateY(-50%)' : 'translateY(0%)';
    this.languette.nativeElement.style.opacity = this.openLanguette ? '0' : '1';
    this.languette.nativeElement.style.zIndex = this.openLanguette ? '-1' : '4';
    this.openLanguette = !this.openLanguette;
  }

  buttonPress(buttonName:string, id: number){
    let arrayData:any = [buttonName, id]
    this.buttonPressed.emit(arrayData);
  }


}
