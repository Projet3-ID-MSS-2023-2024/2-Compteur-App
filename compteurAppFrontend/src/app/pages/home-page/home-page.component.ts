import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  authenticated = false;
  isAdmin = false;
  isFournisseur = false;
  isClient = false;

  fournisseurData: AddFournisseurSpring[] = [];
  filterData: AddFournisseurSpring[] = [];

  constructor(private readonly keycloak: KeycloakService, private route: Router, private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        console.log(this.keycloak.getToken());
        this.isAdmin = this.keycloak.isUserInRole('admin');
        this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
        this.isClient = this.keycloak.isUserInRole('client');
      }

      if(this.isAdmin){
        this.fournisseurService.getFournisseurSpring().subscribe((data:any) => {
          this.fournisseurData = data;
          this.filterData = [...this.fournisseurData];
          console.log(this.fournisseurData);
        });
      }
    });
  }

  searchBarDataReceip(data:any){
    if(data.search == ''){
      this.filterData = [...this.fournisseurData];
    } else {
      this.filterData = this.fournisseurData.filter((fournisseur) => {
        if(fournisseur.userName?.toLowerCase().includes(data.search.toLowerCase())){
          console.log(fournisseur.userName == data.search);
          return fournisseur;
        }
        else
          console.log("From list" + fournisseur.userName + "From search" + data.search);

          return null;
      });
    }
  }


  items = ['Eau', 'Gaz', 'Électricité'];
}
