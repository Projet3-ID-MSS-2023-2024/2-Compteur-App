import { Component } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Observable, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/_services/loading.service';
import { Category } from 'src/models/category';
import { UserDBService } from 'src/app/_services/userDB.service';
import { UserDB } from 'src/models/userDB';
import { addAdresse } from 'src/models/add-adresse';
import { AdresseService } from 'src/app/_services/adresse.service';
import { Compteur } from 'src/models/compteur';
import { CompteurService } from 'src/app/_services/compteur.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';
import { CompteurDTO } from 'src/models/compteurDTO';
import { CompteurDataSender } from 'src/models/compteurDataSender';
import { CompteurDataService } from 'src/app/_services/compteur-data.service';

@Component({
  selector: 'app-send-statement',
  templateUrl: './send-statement.component.html',
  styleUrls: ['./send-statement.component.css'],
})
export class SendStatementComponent {
  showSendStatement: boolean = false;
  showPopUpDelete: boolean = false;
  showPopUpModifyMetter: boolean = false;
  showPopUpSendStatementDesktop: boolean = false;

  idFocus!: string;
  providerFocus!: string;
  category: Category[] = [];

  provider: UserDB[] = [];

  compteur!: CompteurDTO;

  attributLegend = ['Nom compteur', 'Fournisseur', 'Catégorie'];
  buttonOption = ['edit.svg', 'delete.svg', 'send.svg'];
  data: any[][] = [];

  idUserConnecter: any;

  constructor(
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private providerService: UserDBService,
    private adresseService: AdresseService,
    private compteurService: CompteurService,
    private keycloackService: KeycloakService,
    private compteurDataService: CompteurDataService
  ) {}

  async ngAfterViewInit() {
    this.loadingService.emettreEvenement('loading');
    try {
      let user = await this.getDataUser().toPromise();
      if (user) this.idUserConnecter = user.id;
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
    } catch {
      this.loadingService.emettreEvenement('error');
    }
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
        //si c'est un smartphone
        if (window.innerWidth <= 768) {
          this.showSendStatement = true;
        } else {
          this.showPopUpSendStatementDesktop = true;
        }
        break;
    }
  }

  async sendStatement(choice: any) {
    console.log(choice);
    if(choice[0]){
      let provider = await this.getProvideurCompteur(this.idFocus);
      let compteurDataSender:CompteurDataSender = new CompteurDataSender(choice[2],
      choice[1][0],
      this.idUserConnecter,
      provider["result"],
      this.idFocus,
      choice[3].rue,
      choice[3].numero,
      choice[3].codePostal,
      choice[3].ville,
      choice[3].pays,
      "mobile"
      );
      await this.addCompteurData(compteurDataSender);
    }
    this.showSendStatement = false;
  }

  async sendStatementDesktop(choice: any) {
    console.log(choice);
    if(choice[0]){
      let provider = await this.getProvideurCompteur(this.idFocus);
      let compteurDataSender:CompteurDataSender = new CompteurDataSender(choice[2].valeur,
      choice[1][0],
      this.idUserConnecter,
      provider["result"],
      this.idFocus,
      choice[2].rue,
      choice[2].numero,
      choice[2].codePostal,
      choice[2].ville,
      choice[2].pays,
      "desktop"
      );
      await this.addCompteurData(compteurDataSender);
    }
    this.showPopUpSendStatementDesktop = false;
  }

  async deleteChoice(choice: boolean) {
    this.showPopUpDelete = false;
    this.loadingService.emettreEvenement('loading');
    if (choice) {
      try {
        await this.deleteCompteur(this.idFocus);
        this.data = this.data.filter((item) => item[0] !== this.idFocus);
        this.loadingService.emettreEvenement('sucess');
      } catch {
        this.loadingService.emettreEvenement('error');
      }
    }
  }

  async newMetter(data: any) {
    try {
      let adresse = await this.addAdresse(data[1]);
      let compteur = new Compteur(
        data[0].nom,
        this.idUserConnecter,
        data[0].fournisseur,
        adresse.id,
        data[0].categorie
      );
      let newCompteur = await this.addCompteur(compteur);
      this.data.push([
        newCompteur.id,
        newCompteur.nom,
        this.provider.find((item) => item.id === data[0].fournisseur)?.firstname,
        this.category.find((item) => item.id == data[0].categorie)?.name,
      ]);

      this.loadingService.emettreEvenement('sucess');
    } catch {
      console.log('error');
      this.loadingService.emettreEvenement('error');
    }
  }

  async modifyMetter(data: any) {
    this.showPopUpModifyMetter = false;
    if (data != 'close') {
      try {
        let adresse = await this.addAdresse(data[1]);
        let compteur = new Compteur(
          data[0].nom,
          this.idUserConnecter,
          data[0].fournisseur,
          adresse.id,
          data[0].categorie,
          this.idFocus
        );
        let modifiedCompteur = await this.updateCompteur(compteur);
        let index = this.data.findIndex(
          (item) => item[0] === modifiedCompteur.id
        );

        if (index !== -1) {
          this.data[index] = [
            modifiedCompteur.id,
            modifiedCompteur.nom,
            modifiedCompteur.nom_fournisseur,
            modifiedCompteur.nom_category,
          ];
        }

        this.loadingService.emettreEvenement('sucess');
      } catch {
        console.log('error');
        this.loadingService.emettreEvenement('error');
      }
    }
  }

  async getCategory(): Promise<Category[]> {
    const observable = this.categoryService.getAll();
    return lastValueFrom(observable);
  }

  async getProvider(): Promise<UserDB[]> {
    const observable = this.providerService.getAllProviders();
    return lastValueFrom(observable);
  }

  async addAdresse(adresse: addAdresse): Promise<any> {
    const observable = this.adresseService.addAdresse(adresse);
    return lastValueFrom(observable);
  }

  async addCompteur(compteur: Compteur): Promise<CompteurDTO> {
    const observable = this.compteurService.addCompteur(compteur);
    return lastValueFrom(observable);
  }

  async addCompteurData(compteurData: CompteurDataSender): Promise<any> {
    const observable = this.compteurDataService.addCompteurData(compteurData);
    return lastValueFrom(observable);
  }

  async getCompteurs(id: string): Promise<CompteurDTO[]> {
    const observable = this.compteurService.getCompteurs(id);
    return lastValueFrom(observable);
  }

  getDataUser(): Observable<KeycloakProfile> {
    return from(this.keycloackService.loadUserProfile());
  }

  async updateCompteur(compteur: Compteur): Promise<CompteurDTO> {
    const observable = this.compteurService.updateCompteurs(compteur);
    return lastValueFrom(observable);
  }

  async deleteCompteur(id: string): Promise<Compteur> {
    const observable = this.compteurService.deleteCompteurs(id);
    return lastValueFrom(observable);
  }

  async getProvideurCompteur(id: string): Promise<any> {
    const observable = this.compteurService.getProvideurCompteur(id);
    return lastValueFrom(observable);
  }
}
