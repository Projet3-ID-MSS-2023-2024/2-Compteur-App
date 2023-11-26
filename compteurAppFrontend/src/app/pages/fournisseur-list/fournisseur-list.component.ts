import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit{
  authenticated = false;
  isAdmin = false;
  isFournisseur = false;
  isClient = false;

  fournisseurData: AddFournisseurSpring[] = [];
  filterData: AddFournisseurSpring[] = [];

  constructor(private readonly keycloak: KeycloakService, private route: Router, private fournisseurService: FournisseurService, private categoryService: CategoryService) {}

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

  filterByCategory(event: any){
    const category = event.target.value;
    if(category == 'Tout'){
      this.filterData = [...this.fournisseurData];
    } else {
      this.categoryService.getAll().subscribe(
        (data:any) => {
          this.filterData = this.fournisseurData.filter((fournisseur) => {
            let categoryFournisseur = data.find((cat: { id: string | undefined; }) => cat.id == fournisseur.idCategory);
            return categoryFournisseur && categoryFournisseur.name.toLowerCase() == category.toLowerCase();
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  items = ['Tout', 'Eau', 'Gaz', 'Électricité'];

  goToFournisseurInfo(userName: string | undefined){
    this.route.navigate(['/fournisseur-info', userName]);
  }
}
