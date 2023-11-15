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

  fournisseur: AddFournisseurSpring = new AddFournisseurSpring();
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

  deleteFournisseurSpring(id: number | undefined) {
    this.fournisseurService.deleteFournisseurSpring(id).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFournisseurSpring(id: number | undefined) {
    if (id != undefined) {
      this.fournisseurService.updateFournisseurSpring(this.fournisseurs[id], id).subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('id is undefined');
    }
  }


}
