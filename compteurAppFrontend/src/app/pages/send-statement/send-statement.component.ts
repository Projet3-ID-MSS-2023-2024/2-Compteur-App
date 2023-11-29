import { Component } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Observable, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/_services/loading.service';
import { Category } from 'src/models/category';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { UserGet } from 'src/models/user-get';
import { addAdresse } from 'src/models/add-adresse';
import { AdresseService } from 'src/app/_services/adresse.service';
import { Compteur } from 'src/models/compteur';
import { CompteurService } from 'src/app/_services/compteur.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';
import { CompteurDTO } from 'src/models/compteurDTO';

@Component({
  selector: 'app-send-statement',
  templateUrl: './send-statement.component.html',
  styleUrls: ['./send-statement.component.css'],
})
export class SendStatementComponent {
  showSendStatement: boolean = false;
  showPopUpDelete: boolean = false;
  showPopUpModifyMetter: boolean = false;
  idFocus!: string;
  category: Category[] = [];

  provider: UserGet[] = [];

  compteur!:CompteurDTO;

  attributLegend = ['Nom compteur', 'Fournisseur', 'Catégorie'];
  buttonOption = ['edit.svg', 'delete.svg', 'send.svg'];
  data: any[][] = [];

  idUserConnecter: any;

  constructor(
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private providerService: FournisseurService,
    private adresseService: AdresseService,
    private compteurService: CompteurService,
    private keycloackService: KeycloakService
  ) {}

  async ngAfterViewInit() {
    this.loadingService.emettreEvenement('loading');
    let user = await this.getDataUser().toPromise();
    if(user)
    this.idUserConnecter = user.id;
    this.category = await this.getCategory();
    this.provider = await this.getProvider();
    let compteurList = await this.getCompteurs(this.idUserConnecter);
    compteurList.forEach((compteur) => {
      this.data.push([
        compteur.id,
        compteur.nom,
        compteur.nom_fournisseur,
        compteur.nom_category,
      ]);
    });
    this.loadingService.emettreEvenement('sucess');
  }

  buttonPress(arrayData: any) {
    this.idFocus = arrayData[1];
    switch (arrayData[0]) {
      case 'btn1':
        this.showPopUpModifyMetter = true;
        break;
      case 'btn2':
        this.showPopUpDelete = true;
        break;
      case 'btn3':
        this.showSendStatement = true;
        break;
    }
  }

  sendStatement(choice: any) {
    console.log(choice);
    console.log(this.idFocus);
    this.showSendStatement = false;
  }

  deleteChoice(choice: boolean) {
    console.log(choice);
    if(choice){
      this.compteurService.deleteCompteurs(this.idFocus).subscribe();
    }
    this.showPopUpDelete = false;
  }

  async newMetter(data: any) {
    this.loadingService.emettreEvenement('sucess');
    let adresse = await this.addAdresse(data[1]);
    let compteur = new Compteur(
      data[0].nom,
      this.idUserConnecter,
      data[0].fournisseur,
      adresse.id,
      data[0].categorie
    );
    let test = await this.addCompteur(compteur);
    console.log(test);
  }

  modifyMetter(data: any) {
    this.showPopUpModifyMetter = false;
    console.log(data);
  }

  async getCategory(): Promise<Category[]> {
    const observable = this.categoryService.getAll();
    return lastValueFrom(observable);
  }

  async getProvider(): Promise<UserGet[]> {
    const observable = this.providerService.getFournisseurSpring();
    return lastValueFrom(observable);
  }

  async addAdresse(adresse: addAdresse): Promise<any> {
    const observable = this.adresseService.addAdresse(adresse);
    return lastValueFrom(observable);
  }

  async addCompteur(compteur: Compteur): Promise<Compteur> {
    const observable = this.compteurService.addCompteur(compteur);
    return lastValueFrom(observable);
  }

  async getCompteurs(id:string): Promise<CompteurDTO[]> {
    const observable = this.compteurService.getCompteurs(id);
    return lastValueFrom(observable);
  }

  getDataUser(): Observable<KeycloakProfile> {
    return from(this.keycloackService.loadUserProfile());
  }

}
