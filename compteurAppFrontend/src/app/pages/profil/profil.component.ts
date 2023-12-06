import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { User } from 'src/models/user';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addAdresse } from 'src/models/add-adresse';
import { AdresseService } from 'src/app/_services/adresse.service';
import { Adresse } from 'src/models/adresse';
import { UserDB } from 'src/models/userDB';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  attributLegend = ['Mon compteur', 'Fournisseur', 'Categorie'];
  buttonOption = ['edit.svg'];

  closeOrOpenPicture: boolean = false;

  idFocus!: number;

  data!: any[][];
  public registerForm!: FormGroup;
  public adresseForm!: FormGroup;
  userName!: string | undefined;
  isClient!: boolean;
  user$!: Observable<UserDB>;
  fournisseur$!: Observable<AddFournisseurSpring>;
  adresse$!: Observable<Adresse>;
  adresseUser!: Adresse;
  providerEdit: AddFournisseurSpring | undefined;
  userEdit!: User | undefined;
  idUser!: string | undefined;
  idAdresse!: number | undefined;
  idProvider!: number;
  editMode: boolean = false;
  editPageName: string = 'Profil';

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private adresseFormBuilder: FormBuilder,
    private adresseService: AdresseService
  ) {
    this.adresseForm = this.adresseFormBuilder.group({
      rue: ['', [Validators.required, Validators.minLength(3)]],
      codePostal: ['', [Validators.required]],
      ville: ['', [Validators.required]], // Validation pour 10 chiffres |
      pays: [''],
      numero: ['', [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      tva: [''],
      password: [''],
      category: [''],
      lastname: [''],
      firstname: [''],
    });
  }

  ngOnInit(): void {
    this.initUser().then(() => this.initAdresse());
  }

  private async initUser(): Promise<void> {
    console.log('initUser');
    return new Promise<void>(async (resolve, reject) => {
      try {
        const isLoggedIn = await this.keycloak.isLoggedIn();
        if (isLoggedIn) {
          const profile = await this.keycloak.loadUserProfile();
          this.userName = profile.username;
          console.log(this.userName);

          this.isClient = !this.keycloak.isUserInRole('fournisseur');

          this.user$ = this.userService.getUserByUserName(this.userName);
          this.user$.subscribe((data) => {
            this.idUser = data.id;
            console.log(data, this.idUser, this.userName);

            this.registerForm.patchValue({
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              tva: data.tva,
              password: '',
              category: data.category.name,
              lastname: data.lastname,
              firstname: data.firstname,
            });
            resolve();
          });
        } else {
          reject("L'utilisateur n'est pas connecté.");
        }
      } catch (error) {
        reject("Une erreur s'est produite : " + error);
      }
    });
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
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.userEdit = {
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        phoneNumber: this.registerForm.value.phoneNumber,
        userName: this.registerForm.value.username,
        password: this.registerForm.value.password,
        tva: this.registerForm.value.tva,
        category: !this.isClient?this.registerForm.value.category.id:null
      };
      console.log(this.userEdit, this.idUser);
      this.userService.updateUser(this.userEdit, this.idUser).subscribe(
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
  editAdresse() {
    console.log('editAdresse');
    console.log(this.adresseForm.value);
    if (this.adresseForm.valid) {
      this.adresseUser = {
        rue: this.adresseForm.value.rue,
        codePostal: this.adresseForm.value.codePostal,
        ville: this.adresseForm.value.ville,
        pays: this.adresseForm.value.pays,
        numero: this.adresseForm.value.numero,
        id: this.idAdresse,
      };
      console.log(this.adresseUser);
      this.adresseService.updateAdresse(this.adresseUser).subscribe();
    }
  }
  initAdresse() {
    console.log('initAdresse');
    this.adresse$ = this.adresseService.getAdresseByUserName(this.userName);

    this.adresse$.subscribe((data) => {
      console.log(data);
      this.idAdresse = data.id;
      console.log('IdAdresse : ' + this.idAdresse);
      this.adresseForm.patchValue({
        rue: data.rue,
        ville: data.ville,
        pays: data.pays,
        numero: data.numero,
        codePostal: data.codePostal,
      });
    });
  }
  editButton() {
    this.editAdresse();
    this.editUser();
  }
}
