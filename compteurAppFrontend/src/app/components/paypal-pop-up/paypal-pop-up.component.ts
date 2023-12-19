import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FactureDTO} from "../../../models/factureDTO";
import {lastValueFrom, Observable} from "rxjs";
import {User} from "../../../models/user";
import {UserDBService} from "../../_services/userDB.service";
import {Facture} from "../../../models/facture";
import {UserDB} from "../../../models/userDB";
import {Adresse} from "../../../models/adresse";
import {AdresseService} from "../../_services/adresse.service";

@Component({
  selector: 'app-paypal-pop-up',
  templateUrl: './paypal-pop-up.component.html',
  styleUrls: ['./paypal-pop-up.component.css']
})
export class PaypalPopUpComponent implements OnInit{
  @Input() data!: any[] | undefined;
  @Input() userName!: any;
  @Output() buttonPressed: EventEmitter<any> = new EventEmitter<any>();

  attributLegend = ['Quanité','Compteur',  'Prix'];

  buttonOption = [];
  provideurInfoRecue: UserDB | undefined = undefined;
  provideurInfo: UserDB| undefined = undefined;
  provideurAdresseRecue: Adresse | undefined = undefined;
  provideurAdresse: Adresse | undefined = undefined;
  userInfoRecue: UserDB | undefined = undefined;
  userInfo: UserDB | undefined = undefined;
  userAdresseRecue: Adresse | undefined = undefined;
  userAdresse: Adresse | undefined = undefined;
  facture: FactureDTO | undefined = undefined;

  isLoading: boolean = false;

  constructor(
    private userDBService: UserDBService,
    private adresseService: AdresseService,
  ) {}
  async ngOnInit() {
    if (this.data)
    this.provideurInfoRecue = await this.getUserByUserName(this.data[3]);
    this.provideurInfo = this.provideurInfoRecue;
    this.userInfoRecue = await this.getUserByUserName(this.userName);
    this.userInfo = this.userInfoRecue; // <-- Ici
    if (this.data)
    this.provideurAdresseRecue = await this.getAdresseUser(this.data[3] as string);
    if (this.provideurAdresseRecue){
      this.provideurAdresse = this.provideurAdresseRecue
    }else{
      // reset object
    }

    this.userAdresseRecue = await this.getAdresseUser(this.userName);
    if (this.userAdresseRecue) {
      this.userAdresse = this.userAdresseRecue
    }else{
      // reset
    }
    console.log(this.userAdresse);
  }


  getUserByUserName(userName:any) {
    const observable: Observable<UserDB> = this.userDBService.getProviderByUserName(userName);
    return lastValueFrom(observable);
  }

  getAdresseUser(userName:any) {
    const observable: Observable<Adresse> = this.adresseService.getAdresseByUserName(userName);
    return lastValueFrom(observable);
  }

  buttonPress(any: any){
    console.log(any);
    this.buttonPressed.emit(any);
  }




}
