import { Component } from '@angular/core';
import { FournisseurService } from '../_services/fournisseur.service';
import { KeycloakService } from 'keycloak-angular';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent {

  constructor(
    private fournisseurService: FournisseurService,
    private readonly keycloak: KeycloakService
    ) { }

  fournisseurs: AddFournisseurSpring[] = [];

  ngOnInit(): void {
    this.fournisseurService.getFournisseurSpring().subscribe(
      data => {
        this.fournisseurs = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
