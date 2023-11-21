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
import { ProfilCardNavbarComponent } from './components/navbarComponents/profil-card-navbar/profil-card-navbar.component';
import { HomeMainComponent } from './components/homePageComponents/home-main/home-main.component';
import { ClientNavbarComponent } from './components/navbarComponents/client-navbar/client-navbar.component';
import { ProviderNavbarComponent } from './components/navbarComponents/provider-navbar/provider-navbar.component';
import { LockNavbarComponent } from './components/navbarComponents/lock-navbar/lock-navbar.component';
import { NavbarCardLockedComponent } from './components/navbarComponents/navbar-card-locked/navbar-card-locked.component';
import { SendStatementComponent } from './pages/send-statement/send-statement.component';
import { SendStatementMainComponent } from './components/sendStatementComponents/send-statement-main/send-statement-main.component';
import { PageNameComponent } from './components/universalComponents/page-name/page-name.component';
import { InformationPageComponent } from './components/universalComponents/information-page/information-page.component';
import { InformationCardComponent } from './components/universalComponents/information-card/information-card.component';
import { ListIndiceComponent } from './components/sendStatementComponents/list-indice/list-indice.component';
import { IndiceComponent } from './components/universalComponents/indice/indice.component';
import { SearchBarComponent } from './components/universalComponents/search-bar/search-bar.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ProfilMainComponent } from './components/profilComponents/profil-main/profil-main.component';
import { AddMeterComponent } from './components/profilComponents/add-meter/add-meter.component';
import { SendCompteurDataComponent } from './components/sendStatementComponents/send-compteur-data/send-compteur-data.component';
import { ReceivedStatementComponent } from './pages/received-statement/received-statement.component';
import { ReceivedStatementMainComponent } from './components/receivedStatementComponents/received-statement-main/received-statement-main.component';
import { ReceivedListComponent } from './components/receivedStatementComponents/received-list/received-list.component';
import { OptionTraitementComponent } from './components/receivedStatementComponents/option-traitement/option-traitement.component';
import { OptionPaidUnpaidComponent } from './components/receivedStatementComponents/option-paid-unpaid/option-paid-unpaid.component';

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
    ProfilCardNavbarComponent,
    HomeMainComponent,
    ClientNavbarComponent,
    ProviderNavbarComponent,
    LockNavbarComponent,
    NavbarCardLockedComponent,
    SendStatementComponent,
    SendStatementMainComponent,
    PageNameComponent,
    InformationPageComponent,
    InformationCardComponent,
    ListIndiceComponent,
    IndiceComponent,
    SearchBarComponent,
    ProfilComponent,
    ProfilMainComponent,
    AddMeterComponent,
    SendCompteurDataComponent,
    ReceivedStatementComponent,
    ReceivedStatementMainComponent,
    ReceivedListComponent,
    OptionTraitementComponent,
    OptionPaidUnpaidComponent,
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
