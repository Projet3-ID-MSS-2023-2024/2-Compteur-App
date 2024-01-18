import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { lastValueFrom } from 'rxjs';
import { NavbarStatementService } from 'src/app/_services/navbar-statement.service';
import { UserDBService } from 'src/app/_services/userDB.service';
import { UserDB } from 'src/models/userDB';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  isAdmin = false;
  isFournisseur = false;
  isClient = false;
  user!: UserDB;
  navBarIsLocked = false;
  condition1 = false;
  condition2 = false;
  reloadBool = false;
  role = '';

  constructor(
    private readonly keycloak: KeycloakService,
    private userDBService: UserDBService,
    private navbarStatement: NavbarStatementService,
    private route: Router
  ) {}

  ngOnInit(): void {

  }

  async ngAfterViewInit(): Promise<void> {
    const authenticated = await this.keycloak.isLoggedIn();
    if (authenticated) {
      const token = await this.keycloak.getToken();
      // get roles user
      const roles = await this.keycloak.getUserRoles();

      console.log(roles);
      console.log(token);
      // get id user
      const id = (await this.keycloak.loadUserProfile()).id;
      // get user
      this.user = await this.getUser(id);

      if(roles.includes(this.user.role) && this.user!.role != undefined){
        console.log(roles + " " + this.user!.role);
      }
      else
      {
        console.log(roles + " " + this.user!.role + " ELSE" );
        location.reload();
      }

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

    }
    if (this.isClient) {
      this.userDBService
        .hasAddressAndMeter((await this.keycloak.loadUserProfile()).username)?.subscribe((data) => {
          console.log(data);
          this.navbarStatement.setCondition1(data[0]);
          this.navbarStatement.setCondition2(data[1]);
          this.navBarIsLocked = data[0] && data[1];
        });
    }
     // Surveillez les changements de condition1 et condition2
     this.navbarStatement.navBarIsLocked$.subscribe((condition) => {
      this.navBarIsLocked = condition;
      console.log(this.navBarIsLocked);
    });
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

  getUser(id: any): Promise<any> {
    const observable = this.userDBService.getUserById(id);
    return lastValueFrom(observable);
  }

  goToProfil() {
    this.route.navigate(['/profil']);
  }

}
