import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {render} from "creditcardpayments/creditCardPayments";

declare let paypal: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  amount = 69;

  ngOnInit() {
    render(
      {
        id: "#myPaypalButton",
        currency: "EUR",
        value: "69.00",
        onApprove: (details) => {
          alert("Transaction reussite");
        }
      }
    )
  }
}
