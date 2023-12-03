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
  user$!: Observable<User>;
  fournisseur$!: Observable<AddFournisseurSpring>;
  providerEdit: AddFournisseurSpring | undefined;
  userEdit!: User | undefined;
  idUser!: number;
  idProvider!: number;
  editMode: boolean = false;
  editPageName: string = 'Profil';
  adresse$!: Observable<Adresse>;

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private fournisseurService: FournisseurService,
    private formBuilder: FormBuilder,
    private adresseFormBuilder: FormBuilder
  ) {
    this.adresseForm = this.adresseFormBuilder.group({
      rue: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.email]],
      codePostal: ['', [Validators.required]], // Validation pour 10 chiffres |
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initUser().then(() => this.initAdresse());
  }

  private async initUser() {
    console.log("initUser")
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
    console.log("initAdresse")
    this.adresse$ = await this.userService.getAdresseByUserName(this.userName);
    console.log(this.userName)
    this.adresse$.subscribe((data) => {
      console.log(data);
      this.adresseForm.patchValue({
        rue: data.rue,
        codePostal: data.codePostal,
        numero: data.numero,
        ville: data.ville,
        pays: data.pays,
      });
    });
  }
}
