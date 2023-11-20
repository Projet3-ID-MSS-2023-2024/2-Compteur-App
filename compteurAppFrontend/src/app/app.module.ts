import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FournisseurAddComponent } from './fournisseur-add/fournisseur-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdresseAddComponent } from './adresse-add/adresse-add.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbarComponents/navbar/navbar.component';
import { NavbarCardComponent } from './components/navbarComponents/navbar-card/navbar-card.component';
import { UserCardNavbarComponent } from './components/navbarComponents/user-card-navbar/user-card-navbar.component';

/*
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082',
        realm: 'compteurapp',
        clientId: 'angular'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets', '/clients/public'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    });
}*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FournisseurListComponent,
    FournisseurAddComponent,
    AdresseAddComponent,
    HomePageComponent,
    NavbarComponent,
    NavbarCardComponent,
    UserCardNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  /*
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
