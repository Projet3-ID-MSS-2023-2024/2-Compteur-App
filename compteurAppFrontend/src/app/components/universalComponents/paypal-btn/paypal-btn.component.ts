import {Component, OnInit, Input} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.css']
})
export class PaypalBtnComponent implements OnInit{

  //@Input() facture:Facture;
  @Input() factureInfo: any[] = [];

  public payPalConfig ? : IPayPalConfig;


  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    // @ts-ignore
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AT36iU7eUC9ZgW3nLx3D9TjNehsHZL4MjY6sl3a8fQ0o8SSXxvcTQIOCtvREqR-d3VsCK9K7NZENQHqM',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.factureInfo[4],
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.factureInfo[4]
              }
            }
          },
          items: [{
            name: 'Compteur App',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.factureInfo[4],
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        shape: 'pill'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);


      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }
}
