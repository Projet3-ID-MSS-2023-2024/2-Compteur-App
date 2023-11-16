import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ClientService } from '../_services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  authenticated = false;
  isAdmin = false;
  isFournisseur = false;
  isClient = false;

  constructor(private readonly keycloak: KeycloakService, private route: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        console.log(this.keycloak.getToken());
        this.isAdmin = this.keycloak.isUserInRole('admin');
        this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
        this.isClient = this.keycloak.isUserInRole('client');


        if(!this.isAdmin && !this.isFournisseur && !this.isClient) {
          // this.clientService.asignClientRole(this.keycloak.getKeycloakInstance().subject, 'client').subscribe(
          //   (data) => {
          //     console.log(data);
          //   },
          //   (error) => {
          //     console.log(error);
          //   }
          // );
        }
      }
    });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  goToFournisseurs() {
    this.route.navigate(['/fournisseurs']);
  }

  goToAddFournisseur() {
    this.route.navigate(['/addFournisseur']);
  }

  goToAddAdresse() {
    this.route.navigate(['/addAdresse']);
  }
}
