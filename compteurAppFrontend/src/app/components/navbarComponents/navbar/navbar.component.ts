import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isAdmin = false;
  isFournisseur = false;
  isClient = false;

  constructor(private readonly keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then((authenticated) => {
      if (authenticated) {
        console.log(this.keycloak.getToken());
        this.isAdmin = this.keycloak.isUserInRole('admin');
        this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
        this.isClient = this.keycloak.isUserInRole('client');
      }
    });
  }

  logout() {
    this.keycloak.logout();
  }

  isPopup: boolean = false;

  openPopupDeconnexion(){
    this.isPopup = true;
  }

  closePopup(){
    this.isPopup = false;
  }
}
