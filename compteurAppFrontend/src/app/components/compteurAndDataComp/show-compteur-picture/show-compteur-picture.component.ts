import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-show-compteur-picture',
  templateUrl: './show-compteur-picture.component.html',
  styleUrls: ['./show-compteur-picture.component.css']
})
export class ShowCompteurPictureComponent {

  @Output() close: EventEmitter<boolean> = new EventEmitter<any>();
  @Input() image!: string;

  closePicture(){
    this.close.emit(true);
  }

}
