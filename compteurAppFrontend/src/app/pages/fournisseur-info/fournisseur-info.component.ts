import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-fournisseur-info',
  templateUrl: './fournisseur-info.component.html',
  styleUrls: ['./fournisseur-info.component.css']
})
export class FournisseurInfoComponent {
  public registerForm: FormGroup;
  public fournisseurSpring: AddFournisseurSpring | undefined;
  public categories: Category[] = [];
  public idProvider: number | undefined;
  public providerUserName = this.route.snapshot.paramMap.get('userName');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService,
    private CategoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Validation pour 10 chiffres |
      TVA: ['', [Validators.required]],
      password: [''],
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

  ngOnInit() {
    let userName = this.route.snapshot.paramMap.get('userName');
    console.log(userName);
    if (userName) { // Vérifie si 'userName' n'est pas null
      this.fournisseurService.getFournisseurSpringByUserName(userName).subscribe(
        (data) => {
          this.idProvider = data.id;
          this.registerForm.patchValue({
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            TVA: data.tva,
            password: data.password,
            category: data.idCategory
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
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.fournisseurSpring = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password ? this.registerForm.value.password : this.fournisseurSpring?.password,
        firstName: this.registerForm.value.username,
        lastName: this.registerForm.value.username,
        phoneNumber: this.registerForm.value.phoneNumber,
        tva: this.registerForm.value.TVA,
        idCategory: this.registerForm.value.category
      };

      console.log(this.fournisseurSpring);
      this.fournisseurService
        .updateFournisseurSpring(this.fournisseurSpring, this.idProvider )
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

  deleteFournisseur(){
    this.fournisseurService.deleteFournisseurSpring(this.idProvider).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeOrOpenDelete:boolean = false;

  closeDelete(){
    this.closeOrOpenDelete = false;
  }

  openDelete(){
    this.closeOrOpenDelete = true;
  }

}
