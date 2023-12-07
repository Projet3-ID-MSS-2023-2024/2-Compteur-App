import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-paypal-pop-up',
  templateUrl: './paypal-pop-up.component.html',
  styleUrls: ['./paypal-pop-up.component.css']
})
export class PaypalPopUpComponent {

  @Output() buttonPressed: EventEmitter<any> = new EventEmitter<any>();

  buttonPress(any: any){
    console.log(any);
    this.buttonPressed.emit(any);
  }

}
