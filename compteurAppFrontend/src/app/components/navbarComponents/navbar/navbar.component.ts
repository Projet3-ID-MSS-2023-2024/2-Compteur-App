import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { WebApiService } from 'src/app/_services/web-api.service';
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
    private webApiService: WebApiService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const authenticated = await this.keycloak.isLoggedIn();
    if (authenticated) {
      const token = await this.keycloak.getToken();
      console.log(token);
      this.isAdmin = this.keycloak.isUserInRole('admin');
      this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
      this.isClient = this.keycloak.isUserInRole('client');
    }
    if (!this.isAdmin) {
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
