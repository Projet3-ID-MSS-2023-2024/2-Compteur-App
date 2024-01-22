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

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  // Formulaire
  submitted: boolean = false;

  // Formulaire de données utilisateur
  public registerForm!: FormGroup;
  user$!: Observable<UserDB>;
  categoryId!: number | undefined;
  passwordConf: string = '';
  password: string = '';
  editPageName: string = 'Profil';

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

  // Popup
  editPopup: boolean = false;
  donneesModifiees: any[] = [];
  editingUser: boolean = false;

  // Loader
  isLoading: boolean = false;

  // Button
  formChoiceButton: boolean = true;

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private adresseFormBuilder: FormBuilder,
    private adresseService: AdresseService,
    private fournisseurService: FournisseurService,
    private nabarStatement: NavbarStatementService
  ) {
    this.adresseForm = this.adresseFormBuilder.group({
      rue: ['', [Validators.required, Validators.minLength(8)]], // Au moins 8 caractères
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{0,5}$/)]], // Composé uniquement de chiffres
      ville: ['', [Validators.required, Validators.minLength(1)]], // Au moins 1 caractère
      pays: ['', [Validators.required, Validators.minLength(1)]], // Au moins 1 caractère
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Composé uniquement de chiffres
    });
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Au moins 3 caractères
      email: ['', [Validators.required, Validators.email]], // Email valide
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(\+|0)[1-9][0-9]{8,14}$/)],
      ], // Composé uniquement de chiffres
      tva: ['', [Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/)]], // Au moins 1 lettre et 1 chiffre
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ], // Au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial et 6 caractères
      category: [''],
      lastname: ['', [Validators.required, Validators.minLength(2)]], // Au moins 2 caractères
      firstname: ['', [Validators.required, Validators.minLength(2)]], // Au moins 2 caractères
      passwordConf: [''],
    });
  }

  ngOnInit(): void {
    // Initialisation des données utilisateur et activation du loader pendant la reception des données
    this.isLoading = true;
    this.initUser().then(() => {
      this.initAdresse();
      this.isLoading = false;
    });
  }

  private async initUser(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Récupération des données utilisateur via keycloak
        const isLoggedIn = await this.keycloak.isLoggedIn();
        if (isLoggedIn) {
          const profile = await this.keycloak.loadUserProfile();
          this.idUser = profile.id;

          this.isClient = !this.keycloak.isUserInRole('fournisseur');
          this.user$ = this.userService.getUserByUserId(this.idUser);
          this.user$.subscribe((data) => {
            this.idUser = data.id;
            this.registerForm.patchValue({
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              tva: data.tva, // Champs rempli uniquement pour les fournisseurs
              password: '',
              passwordConf: '',
              lastname: data.lastname,
              firstname: data.firstname,
              category: data.category ? data.category.name : '', // Champs rempli uniquement pour les fournisseurs
            });
            this.categoryId = data.category?.id;
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
  // Cette fonction est appelée lors de la confirmation de la modification des données utilisateur
  // Récupère le choix de l'utilisateur et modifie les données si il a confirmé
  editUser(confirmation: boolean) {
    if (confirmation && this.registerForm) {
      // Récupération des données du formulaire
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
      // Modification des données utilisateur si il s'agit d'un client ou d'un administateur
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
      }
      // Modification des données utilisateur si il s'agit d'un fournisseur
      else {
        console.log(this.idUser, this.userEdit);
        this.fournisseurService
          .updateFournisseurSpring(this.userEdit, this.idUser)
          .subscribe((data) => {
            console.log(data);
            this.isLoading = false;
          });
      }
    }
    this.editPopup = false; // Fermeture de la popup
    this.donneesModifiees = []; // Réinitialisation des données modifiées

    // Réinitialisation des champs de mot de passe
    this.registerForm.controls['password'].reset('');
    this.registerForm.controls['passwordConf'].reset('');
  }
  // Cette fonction va récupérer les données du formulaire qui ont été modifiées et les afficher dans la popup
  async editAdressePopup() {
    this.submitted = true;
    this.editingUser = false;
    if (this.idAdresse != undefined && this.adresseForm.valid) {
      this.adresse$.subscribe((data) => {
        // Vérifie si les données ont été modifiées et les ajoute dans un tableau
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
        // Si les données ont été modifiées, affiche la popup
        if (this.donneesModifiees.length > 0) {
          this.editPopup = true;
        }
      });
    }
    // Si l'utilisateur n'a pas d'adresse, vérifie que les données sont valides et ajoute l'adresse
    else if (this.adresseForm.valid) {
      this.editAdresse(true);
      this.adresse$ = await this.adresseService.getAdresseByUserId(this.idUser);
    }
  }
  // Cette fonction va récupérer les données du formulaire qui ont été modifiées et les afficher dans la popup
  editUserPopup() {
    this.submitted = true;
    this.editingUser = true;
    //Vérfie l'identicité des mots de passe et si les données sont valides
    if (this.password == this.passwordConf && this.verifyUserForm()) {
      this.user$.subscribe((data) => {
        // Vérifie si les données ont été modifiées et les ajoute dans un tableau
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
        this.registerForm.value.password != ''
          ? this.donneesModifiees.push({ 'Mot de passe': 'modifié' })
          : null;

        // Si les données ont été modifiées, affiche la popup
        if (this.donneesModifiees.length > 0) {
          this.editPopup = true;
        }
      });
    }
  }

  // Cette fonction va activé le mode édition du profil, ce qui va permettre la modfication des champs
  turnEditMode() {
    if (!this.editMode) {
      this.editPageName = 'Modification du profil';
      if (window.innerWidth < 768) {
        // Scroll jusqu'en bas de la page
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      }
    } else this.editPageName = 'Profil';
    this.editMode = !this.editMode;
  }
  // Affiche les erreurs
  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }
  //Cette fonction va être appelée lors de la confirmation de la modification de l'adresse
  // Récupère le choix de l'utilisateur et modifie les données si il a confirmé
  editAdresse(confirmation: boolean) {
    if (confirmation) {
      // Récupération des données du formulaire
      this.adresseUser = {
        rue: this.adresseForm.value.rue,
        codePostal: this.adresseForm.value.codePostal,
        ville: this.adresseForm.value.ville,
        pays: this.adresseForm.value.pays,
        numero: this.adresseForm.value.numero,
        id: this.idAdresse,
        idClient: this.idUser,
      };
      // Si l'utilisateur n'a pas d'adresse, ajoute l'adresse
      this.adresseUser.idClient = this.idUser;
      this.isLoading = true;
      this.adresseService
        .updateAdresse(this.adresseUser)
        .subscribe((a: any) => {
          this.idAdresse = a.id;
          this.isLoading = false;
        });
      // Le navbarStatement permet de mettre à jour le composant navbar
      // Il permet de débloqué certaines fonctionnalités si l'utilisateur a une adresse et un compteur
      this.nabarStatement.setCondition1(true);
    }
    this.editPopup = false; // Fermeture de la popup
    this.donneesModifiees = []; // Réinitialisation des données modifiées
  }

  // Fonction d'initialisation de l'adresse
  initAdresse() {
    this.adresse$ = this.adresseService.getAdresseByUserId(this.idUser);
    this.adresse$.subscribe((data) => {
      this.idAdresse = data ? data.id : undefined;
      if (data)
        // Remplissage du formulaire avec les données de l'adresse
        this.adresseForm.patchValue({
          rue: data.rue,
          ville: data.ville,
          pays: data.pays,
          numero: data.numero,
          codePostal: data.codePostal,
        });
      // Si le client ne possède pas d'adresse, remplissage du formulaire avec des valeurs par défaut
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
  buttonChoiceSwap() {
    this.formChoiceButton = !this.formChoiceButton;
  }
  validateForm() {
    this.registerForm.value.emailgroup;
  }
  verifyUserForm() {
    if (
      this.registerForm.controls['username'].status == 'VALID' &&
      this.registerForm.controls['email'].status == 'VALID' &&
      this.registerForm.controls['phoneNumber'].status == 'VALID' &&
      this.registerForm.controls['lastname'].status == 'VALID' &&
      this.registerForm.controls['firstname'].status == 'VALID' &&
      (this.registerForm.controls['tva'].status == 'VALID' || this.isClient) &&
      this.registerForm.controls['password'].status == 'VALID'
    ) {
      return true;
    }
    return false;
  }
}
