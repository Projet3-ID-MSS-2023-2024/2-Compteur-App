import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDB} from "../../../models/userDB";
import {Adresse} from "../../../models/adresse";
import {FactureDTO} from "../../../models/factureDTO";
import {UserDBService} from "../../_services/userDB.service";
import {AdresseService} from "../../_services/adresse.service";
import {lastValueFrom, Observable} from "rxjs";
import {Facture} from "../../../models/facture";

@Component({
  selector: 'app-facture-reipt-popup',
  templateUrl: './facture-reipt-popup.component.html',
  styleUrls: ['./facture-reipt-popup.component.css']
})
export class FactureReiptPopupComponent {

  @Input() facture: Facture | undefined = undefined;
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


  isLoading: boolean = false;

  constructor(
    private userDBService: UserDBService,
    private adresseService: AdresseService,
  ) {}
  async ngOnInit() {
    if (this.facture)
      this.provideurInfoRecue = await this.getUserByUserName(this.facture?.nomProvideur);
    this.provideurInfo = this.provideurInfoRecue;
    this.userInfoRecue = await this.getUserByUserName(this.userName);
    this.userInfo = this.userInfoRecue; // <-- Ici
    if (this.facture)
      this.provideurAdresseRecue = await this.getAdresseUser(this.facture?.nomProvideur);
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
