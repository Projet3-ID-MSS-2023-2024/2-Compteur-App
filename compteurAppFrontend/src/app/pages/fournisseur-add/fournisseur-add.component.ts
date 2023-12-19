import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { FournisseurService } from '../../_services/fournisseur.service';
import { Router } from '@angular/router';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';
import { MessageService } from 'src/app/_services/message.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { PhotoProfilService } from 'src/app/_services/photo-profil.service';
import { UserDBService } from 'src/app/_services/userDB.service';

@Component({
  selector: 'app-fournisseur-add',
  templateUrl: './fournisseur-add.component.html',
  styleUrls: ['./fournisseur-add.component.css'],
})
export class FournisseurAddComponent {
  public registerForm: FormGroup;
  public authToken = localStorage.getItem('access_token');
  public fournisseurSpring$!: Observable<AddFournisseurSpring>;
  public categories$!: Observable<Category[]>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
    private CategoryService: CategoryService,
    private messageService: MessageService,
    private location: Location,
    private photoProfilService: PhotoProfilService,
    private userDBService: UserDBService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+32|0)[1-9]\\d{8}$')]], // Validation pour 10 chiffres
      TVA: ['', [Validators.required, Validators.pattern('BE0[0-9]{9}')]], // Validation pour TVA belge
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]], // Validation pour au moins un chiffre et une lettre
      category: ['', [Validators.required]],
    });


    this.categories$ = this.CategoryService.getAll();
  }

  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }
  selectedFile: File | null = null;

  previewUrl: any = null;

  closeOrOpenPopup: boolean = false;

  closePopup() {
    this.closeOrOpenPopup = false;
  }

  handleImages(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];

    // Vérifier si le fichier est une image
    if (this.selectedFile.type.match(/image\/*/) == null) {
      this.closeOrOpenPopup = true;
      return;
    }

    this.previewUrl = URL.createObjectURL(this.selectedFile);
  }

  submitted = false;

  addFournisseur() {
    this.submitted = true;
    this.isLoading = true;
    if (this.registerForm.valid) {
      const fournisseurSpring: AddFournisseurSpring = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.username,
        lastName: this.registerForm.value.username,
        phoneNumber: this.registerForm.value.phoneNumber,
        tva: this.registerForm.value.TVA,
        idCategory: this.registerForm.value.category,
      };
      this.fournisseurService.AddFournisseurSpring(fournisseurSpring).subscribe(
        (data) => {
          this.handleSuccess(data);
          this.previewUrl = null;
        },
        (error) => this.handleError(error)
      );
    } else {
      this.isLoading = false;
      this.registerForm.markAllAsTouched();
    }
  }

  handleSuccess(data: any) {
    this.messageService.changeMessage('Fournisseur ajouté avec succès');
    this.messageService.changePopup(true);
    this.isLoading = false;
    this.userDBService
      .getProviderByUserName(this.registerForm.value.username)
      .subscribe(
        (data) => this.handleProvider(data),
        (error) => this.handleError(error)
      );
  }

  handleProvider(data: any) {
    const id = data.id;
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.photoProfilService
        .uploadPhotoProfil(this.selectedFile, id)
        .subscribe(
          (response) => this.router.navigate(['/listFournisseur']),
          (error) => this.handleError(error)
        );
    } else {
      console.log(
        'Aucun fichier sélectionné, ID utilisateur non défini ou service photoProfilService non défini'
      );
      this.router.navigate(['/listFournisseur']);
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  removeImage() {
    this.previewUrl = null;
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }

  goBack() {
    this.location.back();
  }
}
