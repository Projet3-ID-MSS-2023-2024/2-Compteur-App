import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { WebApiService } from '../_services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  private user: any;
  private isAdmin!: boolean;
  private isFournisseur!: boolean;
  private isClient!: boolean;

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private webApiService: WebApiService // Injectez votre service WebApi
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the user details from the server
    this.user = await this.webApiService.getUserById(this.keycloak.getKeycloakInstance().subject).toPromise();
    if (this.user != null) {
      this.isAdmin = this.user.role == "admin";
      this.isFournisseur = this.user.role == "fournisseur";
      this.isClient = this.user.role == "client";
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => {
      if (role === 'admin') return this.isAdmin;
      if (role === 'fournisseur') return this.isFournisseur;
      if (role === 'client') return this.isClient;
      return false;
    });
  }
}
