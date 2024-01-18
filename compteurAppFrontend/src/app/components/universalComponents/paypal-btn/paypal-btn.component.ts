import {Component, OnInit, Input} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {FactureService} from "../../../_services/facture.service";
import {MailService} from "../../../_services/mail.service";


@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.css']
})
export class PaypalBtnComponent implements OnInit{

  //@Input() facture:Facture;
  @Input() factureInfo: any[] = [];
  @Input() userMail!: any;

  public payPalConfig ? : IPayPalConfig;

  constructor(
    private factureService: FactureService,
    private mailService: MailService,
    ) {}

  ngOnInit(): void {
    this.initConfig();
  }
  sendEmail() {
    const object = 'Payement facture N° ' + this.factureInfo[1];
    const message = 'La facture N° ' + this.factureInfo[1] + ' a été payée avec succès.';
      this.mailService.sendMail('alessio.rinaldi@outlook.com', object, message).subscribe(response => {
        console.log(response);
      } );

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
            value: this.factureInfo[6],
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.factureInfo[6]
              }
            }
          },
          items: [{
            name: "facture number:" + " " + this.factureInfo[1] as string + " " + "for" + " " + this.factureInfo[2] as string,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.factureInfo[6],
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        color: 'blue',
        shape: 'pill',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.sendEmail();
        this.updateStatusFacture(this.factureInfo[1] , "PAYER");
        sessionStorage.setItem('paymentSuccess', 'true');
        location.reload();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);


      },
      onError: err => {
        console.log('OnError', err);
        sessionStorage.setItem('paymentSuccess', 'false');
        location.reload();

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }

  updateStatusFacture(id: number, status:string){
    const observable = this.factureService.updateStatusFacture(id, status);
    observable.subscribe(response => {
      console.log(response);
    });
  }


}
