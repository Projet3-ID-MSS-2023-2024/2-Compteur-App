import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { FournisseurService } from '../../_services/fournisseur.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';
import { MessageService } from 'src/app/_services/message.service';

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
  public categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
    private CategoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      TVA: ['', [Validators.required]],
      password: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.CategoryService.getAll().subscribe(
      (data) => {
        this.categories = data;
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
      console.log(this.registerForm.value);
      this.fournisseurSpring = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.username,
        lastName: this.registerForm.value.username,
        phoneNumber: this.registerForm.value.phoneNumber,
        tva: this.registerForm.value.TVA,
        idCategory: this.registerForm.value.category
      };

      this.fournisseurService
        .AddFournisseurSpring(this.fournisseurSpring)
        .subscribe(
          (data) => {
            this.messageService.changeMessage('Fournisseur ajouté avec succès');
            this.messageService.changePopup(true);
            this.router.navigate(['/listFournisseur']);
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
}