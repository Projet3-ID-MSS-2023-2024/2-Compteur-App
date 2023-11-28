import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { User } from 'src/models/user';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public registerForm: FormGroup;
  userName!: string | undefined;
  isClient!: boolean;
  user$!: Observable<User>;
  fournisseur$!: Observable<AddFournisseurSpring>;

  constructor(
    private keycloak: KeycloakService,
    private userService: UserService,
    private fournisseurService: FournisseurService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      TVA: ['', [Validators.required]],
      password: [''],
      category: ['', [Validators.required]],
      lastname: [''],
      firstname: [''],
    });
  }

  ngOnInit(): void {
    this.initUser();
  }

  private async initUser() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      const profile = await this.keycloak.loadUserProfile();
      this.userName = profile.username;

      if (!this.keycloak.isUserInRole('fournisseur')) {
        this.isClient = true;
        this.user$ = this.userService.getUserByUserName(this.userName);
        this.user$.subscribe((data) => {
          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            lastname: data.lastName,
            firstname: data.firstName
          });
        });
      } else {
        this.isClient = false;
        this.fournisseur$ =
          this.fournisseurService.getFournisseurSpringByUserName(this.userName);
        this.fournisseur$.subscribe((data) => {
          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            TVA: data.tva,
            password: data.password,
            category: data.idCategory,
            lastname: data.lastName,
            firstname: data.firstName
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

  editUser() {}
}
