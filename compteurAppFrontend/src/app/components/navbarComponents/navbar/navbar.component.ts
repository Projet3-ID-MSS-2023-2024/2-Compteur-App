import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserDBService } from 'src/app/_services/userDB.service';
import { UserDB } from 'src/models/userDB';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  isAdmin = false;
  isFournisseur = false;
  isClient = false;
  user: UserDB | undefined;

  constructor(
    private readonly keycloak: KeycloakService,
    private userDBService: UserDBService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const authenticated = await this.keycloak.isLoggedIn();
    if (authenticated) {
      const token = await this.keycloak.getToken();
      console.log(token);
      this.isAdmin = this.keycloak.isUserInRole('admin');
      this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
      this.isClient = this.keycloak.isUserInRole('client');

      if(this.isAdmin && this.isClient){
        this.isClient = false;
      }
      if(this.isFournisseur && this.isClient){
        this.isClient = false;
      }
    }
    if (!this.isAdmin && !this.isFournisseur && !this.isClient) {
      location.reload();
    }

  }

  logout() {
    this.keycloak.logout();
  }

  isPopup: boolean = false;

  openPopupDeconnexion() {
    this.isPopup = true;
  }

  closePopup() {
    this.isPopup = false;
  }
}
