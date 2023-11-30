import {Component, OnInit} from '@angular/core';
import {render} from "creditcardpayments/creditCardPayments";
@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.css']
})
export class PaypalBtnComponent implements OnInit{

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
