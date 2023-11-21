import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addAdresse } from 'src/models/add-adresse';
import { AdresseService } from '../_services/adresse.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-adresse-add',
  templateUrl: './adresse-add.component.html',
  styleUrls: ['./adresse-add.component.css'],
})
export class AdresseAddComponent implements OnInit{
  public adresseForm: FormGroup;
  public adresse: addAdresse | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adresseService: AdresseService,
    private readonly keycloak: KeycloakService
  ) {
    this.adresseForm = this.formBuilder.group({
      rue: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      pays: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.adresseService.getAdresses().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any) {
    console.error('Une erreur est survenue : ', error);
  }

  addAdresse() {
    if (this.adresseForm.valid) {
      this.adresse = {
        rue: this.adresseForm.value.rue,
        numero: this.adresseForm.value.numero,
        ville: this.adresseForm.value.ville,
        codePostal: this.adresseForm.value.codePostal,
        pays: this.adresseForm.value.pays,
      };

      this.adresseService.addAdresse(this.adresse).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }
}
