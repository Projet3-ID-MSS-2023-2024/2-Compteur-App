import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable, take } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { MessageService } from 'src/app/_services/message.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';
import { Location } from '@angular/common';
import { UserDBService } from 'src/app/_services/userDB.service';
import { PhotoProfilService } from 'src/app/_services/photo-profil.service';
import { CompteurService } from 'src/app/_services/compteur.service';

@Component({
  selector: 'app-fournisseur-info',
  templateUrl: './fournisseur-info.component.html',
  styleUrls: ['./fournisseur-info.component.css'],
})
export class FournisseurInfoComponent implements OnInit {
  public registerForm: FormGroup;
  public fournisseurSpring$!: Observable<any>;
  public categories$!: Observable<Category[]>;
  public idProvider!: string;
  public providerUserName = this.route.snapshot.paramMap.get('userName');
  showDiv = false;
  isLoading = false;
  nameCategory!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
    private userDBService: UserDBService,
    private photoProfilService: PhotoProfilService,
    private compteurService: CompteurService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+|0)[1-9][0-9]{8,14}$/)]], // Validation pour 10 chiffres
      TVA: ['', [Validators.required, Validators.pattern('BE0[0-9]{9}')]], // Validation pour TVA belge
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/)]],
      passwordVerif: ['', [Validators.required]],
      category: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'passwordVerif')
    });
    this.categories$ = this.CategoryService.getAll();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }



  public photoUrl!: string;
  photoNull!: boolean;

  ngOnInit() {
    this.photoNull = true;
    let userName = this.route.snapshot.paramMap.get('userName');
    console.log(userName);
    if (userName) {
      // Vérifie si 'userName' n'est pas null
      this.fournisseurSpring$ = this.userDBService.getProviderByUserName(userName);
      this.fournisseurSpring$.pipe(take(1)).subscribe(
        (data) => {
          console.log(data);
          this.idProvider = data.id;
          this.registerForm.patchValue({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            TVA: data.tva,
            password: data.password,
            category: data.category.id,
          });
          this.nameCategory = data.category.name;
          this.photoProfilService.getPhotoProfil(data.id).pipe(take(1)).subscribe(
            response => {
              if(response) {
                this.photoUrl = response.path;
                this.photoNull = false;
              }
              else{
                this.photoNull = true;
              }
            },
            error => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Nom d'utilisateur non fourni dans l'URL");
    }
  }

  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }

  submitted = false;

  updateFournisseur() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.fournisseurSpring$.pipe(take(1)).subscribe((fournisseurSpring) => {
        const updatedFournisseur: AddFournisseurSpring = {
          ...fournisseurSpring,
          userName: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
            ? this.registerForm.value.password
            : fournisseurSpring.password,
          firstName: this.registerForm.value.username,
          lastName: this.registerForm.value.username,
          phoneNumber: this.registerForm.value.phoneNumber,
          tva: this.registerForm.value.TVA,
          idCategory: this.registerForm.value.category,
        };

        this.fournisseurService
          .updateFournisseurSpring(updatedFournisseur, this.idProvider)
          .pipe(take(1))
          .subscribe(
            (data) => {
              console.log(data);
              this.isLoading = false;
              this.messageService.changeMessage('Fournisseur modifié avec succès');
              this.messageService.changePopup(true);
              this.router.navigate(['/listFournisseur']);
            },
            (error) => {
              console.log('error');
              this.handleError(error);
            }
          );
      });
    }
  }
  messagePopup!: string;
  displayPopupErreurFournisseur: boolean = false;

  deleteFournisseur() {
    this.isLoading = true;
    this.fournisseurService.deleteFournisseurSpring(this.idProvider).pipe(take(1)).subscribe(
      (data) => {
        console.log(data);
        this.messageService.changeMessage('Fournisseur supprimé avec succès');
        this.messageService.changePopup(true);
        this.isLoading = false;
        this.router.navigate(['/listFournisseur']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedFile!: File;

  @ViewChild('fileInput') fileInput!: ElementRef;
  onFileSelect(event: Event) {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];
    if (this.selectedFile.type.match(/image\/*/) == null) {
      alert("Seules les images sont supportées");
      return;
    }
    this.photoProfilService.updatePhotoProfil(this.selectedFile, this.idProvider).pipe(take(1)).subscribe(
      (data) => {
        this.photoUrl = data.path;
        this.photoNull = false;
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileChangeAdd(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];
    if (this.selectedFile.type.match(/image\/*/) == null) {
      this.messagePopup = "Seules les images sont supportées";
      this.displayPopupErreurFournisseur = true;
      return;
    }
    this.photoProfilService.uploadPhotoProfil(this.selectedFile, this.idProvider).subscribe(
      (data) => {
        console.log(data);
        this.photoUrl = data.path;
        this.photoNull = false;
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeOrOpenDelete: boolean = false;
  closeOrOpenModify: boolean = false;

  closeModify() {
    this.closeOrOpenModify = false;
  }

  openModify() {
    this.submitted = true;
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    } else {
      this.closeOrOpenModify = true;
    }
  }

  closeDelete() {
    this.closeOrOpenDelete = false;
  }

  closeDeleteError() {
    this.displayPopupErreurFournisseur = false;
  }

  openDelete() {
    this.closeOrOpenDelete = true;
  }

  delete() {
    this.compteurService.getCompteurProvider(this.idProvider).pipe(take(1)).subscribe(
      (data) => {
        console.log(data);
        if(data[0]){
          console.log("HERE");
          this.messagePopup = "Ce fournisseur est lié à un compteur, vous ne pouvez pas le supprimer";
          this.displayPopupErreurFournisseur = true;}
         else{
          this.openDelete();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  deletePhotoProfil() {
    this.photoProfilService.deletePhotoProfil(this.idProvider).pipe(take(1)).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
