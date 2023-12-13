import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NavbarStatementService } from 'src/app/_services/navbar-statement.service';
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
  navBarIsLocked = false;
  condition1 = false;
  condition2 = false;
  reloadBool = false;

  constructor(
    private readonly keycloak: KeycloakService,
    private userDBService: UserDBService,
    private navbarStatement: NavbarStatementService
  ) {}

  ngOnInit(): void {
    // Surveillez les changements de condition1 et condition2
    this.navbarStatement.condition1$.subscribe((condition1) => {
      console.log(condition1);
      if (condition1 == true) {
        this.condition1 = true;
        this.reload();
      }
    });

    this.navbarStatement.condition2$.subscribe((condition2) => {
      console.log(condition2);
      if (condition2 == true) {
        this.condition2 = true;
        this.reload();
      }
    });
  }

  reload() {
    console.log(this.condition1, this.condition2, this.reloadBool);
    if (
      this.condition1 == true &&
      this.condition2 == true &&
      this.reloadBool == false
    ) {
      this.reloadBool = true;
      this.ngAfterViewInit()
    }
  }

  async ngAfterViewInit(): Promise<void> {
    const authenticated = await this.keycloak.isLoggedIn();
    if (authenticated) {
      const token = await this.keycloak.getToken();
      console.log(token);
      this.isAdmin = this.keycloak.isUserInRole('admin');
      this.isFournisseur = this.keycloak.isUserInRole('fournisseur');
      this.isClient = this.keycloak.isUserInRole('client');

      if (this.isAdmin && this.isClient) {
        this.isClient = false;
      }
      if (this.isFournisseur && this.isClient) {
        this.isClient = false;
      }
    }
    if (!this.isAdmin && !this.isFournisseur && !this.isClient) {
      location.reload();
    }
    if (this.isClient) {
      this.userDBService
        .hasAddressAndMeter((await this.keycloak.loadUserProfile()).username)
        .subscribe((data) => {
          console.log(data);
          data ? (this.navBarIsLocked = false) : (this.navBarIsLocked = true);
        });
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
