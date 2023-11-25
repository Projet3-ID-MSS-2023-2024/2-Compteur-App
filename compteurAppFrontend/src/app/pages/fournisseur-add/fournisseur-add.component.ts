import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { FournisseurService } from '../../_services/fournisseur.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Component({
  selector: 'app-fournisseur-add',
  templateUrl: './fournisseur-add.component.html',
  styleUrls: ['./fournisseur-add.component.css'],
})
export class FournisseurAddComponent {
  public registerForm: FormGroup;
  public authToken = localStorage.getItem('access_token');
  public fournisseur: AddFournisseur | undefined;
  public fournisseurSpring: AddFournisseurSpring | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      TVA: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.fournisseurService.getFournisseurSpring().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }

  addFournisseur() {
    if (this.registerForm.valid) {
      this.fournisseurSpring = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.username,
        lastName: this.registerForm.value.username,
        phoneNumber: this.registerForm.value.phoneNumber,
        tva: this.registerForm.value.TVA,
      };

      this.fournisseurService
        .AddFournisseurSpring(this.fournisseurSpring)
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

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadLogo() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('logo', this.selectedFile, this.selectedFile.name);

      // Envoyer le formulaire avec le fichier vers votre backend
      // Vous devez implémenter le service backend pour gérer le stockage du fichier
      // par exemple, en utilisant une API REST avec Express, Flask, etc.
      // Exemple fictif :
      // this.logoService.uploadLogo(formData).subscribe(response => {
      //   console.log('Logo téléchargé avec succès', response);
      // });
    } else {
      console.log('Aucun fichier sélectionné.');
    }
  }
}
