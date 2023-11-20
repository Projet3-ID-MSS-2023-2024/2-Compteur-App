import { Component, Input, OnInit, ViewChildren, AfterViewInit, ElementRef, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements AfterViewInit{

  @Input() indiceArray: any[] = [];
  @Input() legend!:boolean;
  @ViewChildren('indices') indices!: QueryList<ElementRef>;
  @ViewChildren('text') text!: QueryList<ElementRef>;
  @ViewChild('indiceButton') indiceButton!: ElementRef;

  /* Set size of an indice to perfect size */
  ngAfterViewInit(): void {
      let sizeMax = 90;
      let size = sizeMax / this.indiceArray.length;
      this.indiceButton.nativeElement.style.marginRight = this.legend ? '12px' : '0px';
      this.indices.forEach((element) => {
        element.nativeElement.style.width = size + '%';
      });
      this.text.forEach((element) => {
        element.nativeElement.style.color = this.legend ? 'rgba(0, 0, 0, 0.500)' : '#3a475b ';
      });
  }


}
