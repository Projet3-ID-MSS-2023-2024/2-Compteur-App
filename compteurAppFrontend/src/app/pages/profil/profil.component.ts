import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { User } from 'src/models/user';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adresse } from 'src/models/adresse';
import { AdresseService } from 'src/app/_services/adresse.service';
import { CompteurService } from 'src/app/_services/compteur.service';
import { CompteurDTO } from 'src/models/compteurDTO';
import { CompteurDataService } from 'src/app/_services/compteur-data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  // Affichage des données de compteur
  attributLegend = ['Mon compteur', 'Fournisseur', 'Categorie'];
  buttonOption = ['edit.svg'];
  closeOrOpenPicture: boolean = false;
  idFocus!: number;
  dataCompteurs$!: Observable<CompteurDTO[]>;

  // Affichage des données du client
  public registerForm!: FormGroup;
  public adresseForm!: FormGroup;

  // Données du client
  userName!: string | undefined;
  isClient!: boolean;
  user$!: Observable<User>;
  fournisseur$!: Observable<AddFournisseurSpring>;
  adresse$!: Observable<Adresse>;

  // Modification du profil
  providerEdit: AddFournisseurSpring | undefined;
  userEdit!: User | undefined;
  idUser!: number;
  idAdresse!: number | undefined;
  idProvider!: number;
  editMode: boolean = false;
  editPageName: string = 'Profil';
  adresseEdit!: Adresse | undefined;

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private fournisseurService: FournisseurService,
    private formBuilder: FormBuilder,
    private adresseFormBuilder: FormBuilder,
    private adresseService: AdresseService,
    private compteurService: CompteurDataService
  ) {
    this.adresseForm = this.adresseFormBuilder.group({
      rue: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      codePostal: ['', [Validators.required]], // Validation pour 10 chiffres |
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initUser().then(() => (this.initAdresse(),this.initCompteur()));
  }

  private async initUser() {
    console.log('initUser');
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      const profile = await this.keycloak.loadUserProfile();
      this.userName = profile.username;

      if (!this.keycloak.isUserInRole('fournisseur')) {
        this.isClient = true;
        this.registerForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
          password: [''],
          lastname: ['', [Validators.required]],
          firstname: ['', [Validators.required]],
        });
        this.user$ = await this.userService.getUserByUserName(this.userName);
        this.user$.subscribe((data) => {
          this.idUser = data.id ? data.id : -1;
          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            lastname: data.lastName,
            firstname: data.firstName,
          });
        });
      } else {
        this.isClient = false;
        this.registerForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
          TVA: ['', [Validators.required]],
          password: [''],
          category: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          firstname: ['', [Validators.required]],
        });
        this.fournisseur$ =
          this.fournisseurService.getFournisseurSpringByUserName(this.userName);
        this.fournisseur$.subscribe((data) => {
          console.log(data, this.idProvider, this.userName);
          this.idProvider = data.id ? data.id : -1;

          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            TVA: data.tva,
            password: data.password,
            category: data.idCategory,
            lastname: data.lastName,
            firstname: data.firstName,
          });
        });
      }
    }
  }
  buttonPress(arrayData: any) {
    switch (arrayData[0]) {
      case 'btn1':
        this.closeOrOpenPicture = true;
        break;
      case 'btn2':
        break;
    }
    this.idFocus = arrayData[1];
  }
  editUser() {
    if (this.isClient) {
      console.log(this.registerForm);
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        this.userEdit = {
          email: this.registerForm.value.email,
          firstName: this.registerForm.value.firstname,
          lastName: this.registerForm.value.lastname,
          phoneNumber: this.registerForm.value.phoneNumber,
          userName: this.registerForm.value.username,
          password: this.registerForm.value.password,
        };
        console.log(this.userEdit, this.idUser);
        this.userService.updateUserSpring(this.userEdit, this.idUser).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log('error');
            this.handleError(error);
          }
        );
      }
    } else {
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        this.providerEdit = {
          email: this.registerForm.value.email,
          firstName: this.registerForm.value.firstname,
          lastName: this.registerForm.value.lastname,
          phoneNumber: this.registerForm.value.phoneNumber,
          userName: this.registerForm.value.username,
          password: this.registerForm.value.password,
          tva: this.registerForm.value.tva,
          idCategory: this.registerForm.value.category,
        };
        this.fournisseurService
          .updateFournisseurSpring(this.providerEdit, this.idProvider)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log('error');
              this.handleError(error);
            }
          );
      }
    }
  }
  editAdresse() {
    console.log(this.adresseForm);
    if (this.adresseForm.valid) {
      console.log(this.adresseForm.value);
      this.adresseEdit = {
        rue: this.adresseForm.value.rue,
        codePostal: this.adresseForm.value.codePostal,
        numero: this.adresseForm.value.numero,
        ville: this.adresseForm.value.ville,
        pays: this.adresseForm.value.pays,
        id: this.idAdresse
      };
      console.log(this.adresseEdit, this.idAdresse);
      this.adresseService
        .updateAdresse(this.adresseEdit)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log('error');
            this.handleError(error);
          }
        );
    }
  }
  turnEditMode() {
    if (!this.editMode) {
      this.editPageName = 'Modification du profil';
    } else this.editPageName = 'Profil';
    this.editMode = !this.editMode;
  }
  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }
  testerMdp(chaine: string) {
    const regexVerif = /[A-Z][a-z][\d][!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]]/;
    return regexVerif.test(chaine);
  }
  private async initAdresse() {
    console.log('initAdresse');
    this.adresse$ = await this.userService.getAdresseByUserName(this.userName);
    console.log(this.userName);
    this.adresse$.subscribe((data) => {
      console.log(data);
      this.idAdresse = data.id;
      this.adresseForm.patchValue({
        rue: data.rue,
        codePostal: data.codePostal,
        numero: data.numero,
        ville: data.ville,
        pays: data.pays,
      });
    });
  }
  editButton() {
    this.editAdresse();
    this.editUser();
  }
  async initCompteur(){
    console.log("initCompteur : "+ this.idUser);
    this.dataCompteurs$ = await this.compteurService.getCompteursByClientid(this.idUser.toString(),0,100);
    this.dataCompteurs$.subscribe((data) => console.log(data));
  }
}
