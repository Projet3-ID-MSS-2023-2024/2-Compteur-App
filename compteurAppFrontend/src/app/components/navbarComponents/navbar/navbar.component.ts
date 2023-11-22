import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  role: string = "fournisseur";

  constructor(private readonly keycloak: KeycloakService) {}

  ngOnInit(): void {

  }

  logout() {
    this.keycloak.logout();
  }

}
