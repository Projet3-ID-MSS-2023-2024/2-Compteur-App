import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  authenticated = false;
  isAdmin = false;
  isUser = false;

  constructor(private readonly keycloak: KeycloakService, private route: Router, private userService: UserService) {
    this.keycloak.isLoggedIn().then((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        this.isAdmin = this.keycloak.isUserInRole('ADMIN');
        this.isUser = this.keycloak.isUserInRole('USER');
      }
    });

  }
  ngOnInit(): void {
    this.userService.getUserBySpring().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
