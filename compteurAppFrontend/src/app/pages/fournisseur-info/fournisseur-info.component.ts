import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { MessageService } from 'src/app/_services/message.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fournisseur-info',
  templateUrl: './fournisseur-info.component.html',
  styleUrls: ['./fournisseur-info.component.css'],
})
export class FournisseurInfoComponent {
  public registerForm: FormGroup;
  public fournisseurSpring$!: Observable<AddFournisseurSpring>;
  public categories$!: Observable<Category[]>;
  public idProvider: number | undefined;
  public providerUserName = this.route.snapshot.paramMap.get('userName');
  showDiv = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      TVA: ['', [Validators.required]],
      password: [''],
      category: ['', [Validators.required]],
    });

    this.categories$ = this.CategoryService.getAll();
  }

  ngOnInit() {
    let userName = this.route.snapshot.paramMap.get('userName');
    console.log(userName);
    if (userName) {
      // Vérifie si 'userName' n'est pas null
      this.fournisseurSpring$ =
        this.fournisseurService.getFournisseurSpringByUserName(userName);
      this.fournisseurSpring$.subscribe(
        (data) => {
          this.idProvider = data.id;
          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            TVA: data.tva,
            password: data.password,
            category: data.idCategory,
          });
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

  addFournisseur() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.fournisseurSpring$.subscribe((fournisseurSpring) => {
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

        console.log(updatedFournisseur);
        this.fournisseurService
          .updateFournisseurSpring(updatedFournisseur, this.idProvider)
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

  deleteFournisseur() {
    this.isLoading = true;
    this.fournisseurService.deleteFournisseurSpring(this.idProvider).subscribe(
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

  closeOrOpenDelete: boolean = false;
  closeOrOpenModify: boolean = false;

  closeModify() {
    this.closeOrOpenModify = false;
  }

  openModify() {
    this.closeOrOpenModify = true;
  }

  closeDelete() {
    this.closeOrOpenDelete = false;
  }

  openDelete() {
    this.closeOrOpenDelete = true;
  }

  goBack() {
  this.location.back();
}
}
