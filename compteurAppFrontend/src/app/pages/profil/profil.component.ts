import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, lastValueFrom, take } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdresseService } from 'src/app/_services/adresse.service';
import { Adresse } from 'src/models/adresse';
import { UserDB } from 'src/models/userDB';
import { CompteurDTO } from 'src/models/compteurDTO';
import { AdresseDTO } from 'src/models/adresseDTO';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';
import { NavbarStatementService } from 'src/app/_services/navbar-statement.service';
import { PhotoProfilService } from 'src/app/_services/photo-profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  // Formulaire de données utilisateur
  public registerForm!: FormGroup;
  user$!: Observable<UserDB>;
  categoryId!: number | undefined;
  passwordConf: string = '';
  password: string = '';

  //Formulaire d'adresse
  public adresseForm!: FormGroup;
  adresse$: Observable<Adresse> = new Observable<Adresse>();

  // Données utilisateur
  isClient!: boolean;
  idUser!: string | undefined;
  idAdresse!: number | undefined;

  // Données modification
  userEdit!: AddFournisseurSpring | undefined;
  adresseUser!: AdresseDTO;
  editMode: boolean = false;

  // Données photo de profil
  editPageName: string = 'Profil';
  photoUrl!: string;
  photoNull: boolean = true;
  editPdp: boolean = false;

  // Popup
  editPopup: boolean = false;
  donneesModifiees: any[] = [];
  editingUser: boolean = false;

  // Loader
  isLoading: boolean = false;

  // Button
  formChoiceButton: boolean = true;
  editHover: boolean = false;
  deleteHover: boolean = false;

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private adresseFormBuilder: FormBuilder,
    private adresseService: AdresseService,
    private fournisseurService: FournisseurService,
    private nabarStatement: NavbarStatementService,
    private photoProfilService: PhotoProfilService
  ) {
    this.adresseForm = this.adresseFormBuilder.group({
      rue: [[Validators.minLength(8)]], // Vide ou plus grande que 8 caractères
      codePostal: [[Validators.pattern(/^\d{0,5}$/)]], // Maximum 5 chiffres
      ville: [[Validators.minLength(1)]], // Vide ou au moins 1 caractère
      pays: [[Validators.minLength(1)]], // Vide ou au moins 1 caractère
      numero: [[Validators.pattern(/^\d+$/)]], // Composé uniquement de chiffres
    });
    this.registerForm = this.formBuilder.group({
      username: [[Validators.required, Validators.minLength(3)]],
      email: [[Validators.required, Validators.email]],
      phoneNumber: [[Validators.required, Validators.pattern(/^\d{10}$/)]], // Validation pour 10 chiffres
      tva: [['', Validators.pattern(/^\d{0,15}$/)]], // Maximum 15 chiffres
      password: [
        [
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      category: [''],
      lastname: [[Validators.minLength(1)]], // Au moins 1 caractère
      firstname: [[Validators.minLength(1)]], // Au moins 1 caractère
      passwordConf: [['']],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initUser().then(() => {
      this.initAdresse();
      this.isLoading = false;
    });
  }

  private async initUser(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const isLoggedIn = await this.keycloak.isLoggedIn();
        if (isLoggedIn) {
          const profile = await this.keycloak.loadUserProfile();
          console.log(profile)
          this.idUser = profile.id;

          this.isClient = !this.keycloak.isUserInRole('fournisseur');
          this.user$ = this.userService.getUserByUserId(this.idUser);
          this.user$.subscribe((data) => {
            console.log(data);
            this.idUser = data.id;

            this.registerForm.patchValue({
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              tva: data.tva,
              password: '',
              passwordConf: '',
              lastname: data.lastname,
              firstname: data.firstname,
              category: data.category ? data.category.name : '',
            });
            this.categoryId = data.category?.id;
            this.initPdp(data.id);
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
  editUser(confirmation: boolean) {
    if (confirmation && this.registerForm.valid) {
      this.userEdit = {
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        phoneNumber: this.registerForm.value.phoneNumber,
        userName: this.registerForm.value.username,
        password: this.registerForm.value.password,
        tva: this.registerForm.value.tva,
        idCategory: this.categoryId?.toString(),
      };
      this.isLoading = true;
      if (this.isClient) {
        this.userService.updateUser(this.userEdit, this.idUser).subscribe(
          (data) => {
            console.log(data);
            this.isLoading = false;
          },
          (error) => {
            console.log('error');
            this.handleError(error);
            this.isLoading = false;
          }
        );
      } else {
        console.log(this.idUser, this.userEdit);
        this.fournisseurService
          .updateFournisseurSpring(this.userEdit, this.idUser)
          .subscribe((data) => {
            console.log(data);
            this.isLoading = false;
          });
      }
    }
    this.editPopup = false;
    this.donneesModifiees = [];
  }
  editAdressePopup() {
    this.editingUser = false;
    console.log('idadresse : '+this.idAdresse)
    if (this.idAdresse != undefined) {
      this.adresse$.subscribe((data) => {
        data.codePostal != this.adresseForm.value.codePostal
          ? this.donneesModifiees.push({
              'Code postal': this.adresseForm.value.codePostal,
            })
          : null;
        data.numero != this.adresseForm.value.numero
          ? this.donneesModifiees.push({
              Numéro: this.adresseForm.value.numero,
            })
          : null;
        data.pays != this.adresseForm.value.pays
          ? this.donneesModifiees.push({ Pays: this.adresseForm.value.pays })
          : null;
        data.rue != this.adresseForm.value.rue
          ? this.donneesModifiees.push({ Rue: this.adresseForm.value.rue })
          : null;
        data.ville != this.adresseForm.value.ville
          ? this.donneesModifiees.push({ Ville: this.adresseForm.value.ville })
          : null;
        if (this.donneesModifiees.length > 0) {
          this.editPopup = true;
        }
      });
    } else this.editAdresse(true);
  }
  editUserPopup() {
    if (this.password == this.passwordConf) {
      this.editingUser = true;

      this.user$.subscribe((data) => {
        data.email != this.registerForm.value.email
          ? this.donneesModifiees.push({ Email: this.registerForm.value.email })
          : null;
        data.firstname != this.registerForm.value.firstname
          ? this.donneesModifiees.push({
              Prénom: this.registerForm.value.firstname,
            })
          : null;
        data.lastname != this.registerForm.value.lastname
          ? this.donneesModifiees.push({
              Nom: this.registerForm.value.lastname,
            })
          : null;
        data.phoneNumber != this.registerForm.value.phoneNumber
          ? this.donneesModifiees.push({
              Téléphone: this.registerForm.value.phoneNumber,
            })
          : null;
        data.tva != this.registerForm.value.tva
          ? this.donneesModifiees.push({ TVA: this.registerForm.value.tva })
          : null;
        data.username != this.registerForm.value.username
          ? this.donneesModifiees.push({
              "Nom d'utilisateur": this.registerForm.value.username,
            })
          : null;
        if (this.donneesModifiees.length > 0) {
          this.editPopup = true;
        }
      });
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
  editAdresse(confirmation: boolean) {
    if (confirmation && this.adresseForm.valid) {
      this.adresseUser = {
        rue: this.adresseForm.value.rue,
        codePostal: this.adresseForm.value.codePostal,
        ville: this.adresseForm.value.ville,
        pays: this.adresseForm.value.pays,
        numero: this.adresseForm.value.numero,
        id: this.idAdresse,
        idClient: this.idUser,
      };
      this.adresseUser.idClient = this.idUser;
      this.isLoading = true;
      this.adresseService.updateAdresse(this.adresseUser).subscribe(() => {
        this.isLoading = false;
      });
      this.nabarStatement.setCondition1(true);
    }
    this.editPopup = false;
    this.donneesModifiees = [];
  }

  initAdresse() {
    this.adresse$ = this.adresseService.getAdresseByUserId(this.idUser);
    this.adresse$.subscribe((data) => {
      this.idAdresse = data ? data.id : undefined;
      if (data)
        this.adresseForm.patchValue({
          rue: data.rue,
          ville: data.ville,
          pays: data.pays,
          numero: data.numero,
          codePostal: data.codePostal,
        });
      else
        this.adresseForm.patchValue({
          rue: '',
          ville: '',
          pays: '',
          numero: '',
          codePostal: '',
        });
    });
  }
  deletePhotoProfil() {
    this.isLoading = true;
    this.photoProfilService
      .deletePhotoProfil(this.idUser)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.photoNull = true;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    this.deleteHover = false;
    this.editPdp = false;
  }
  onFileChangeAdd(event: Event) {
    console.log('add');
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files[0].type.match(/image\/*/) == null) {
      return;
    }
    this.isLoading = true;
    this.photoProfilService.uploadPhotoProfil(files[0], this.idUser).subscribe(
      (data) => {
        console.log(data);
        this.photoNull = false;
        this.initPdp(this.idUser);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
    this.editPdp = false;
  }
  onFileChange(event: Event) {
    console.log('change');
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files[0].type.match(/image\/*/) == null) {
      alert('Seules les images sont supportées');
      return;
    }
    this.isLoading = true;
    this.photoProfilService
      .updatePhotoProfil(files[0], this.idUser)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.photoUrl = data.path;
          this.photoNull = false;
          this.initPdp(this.idUser);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    this.editPdp = false;
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  onFileSelect(event: Event) {
    this.fileInput.nativeElement.click();
  }
  initPdp(id: any) {
    this.photoProfilService
      .getPhotoProfil(id)
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (response) {
            this.photoUrl = response.path;
            console.log(response.path);
            this.photoNull = false;
          } else {
            this.photoNull = true;
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }
  buttonChoiceSwap() {
    this.formChoiceButton = !this.formChoiceButton;
  }
  editPdpButton() {
    this.editPdp = !this.editPdp;
  }
}
