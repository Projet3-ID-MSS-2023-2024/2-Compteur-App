import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdresseAddComponent } from './adresse-add/adresse-add.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbarComponents/navbar/navbar.component';
import { NavbarCardComponent } from './components/navbarComponents/navbar-card/navbar-card.component';
import { ProfilCardNavbarComponent } from './components/navbarComponents/profil-card-navbar/profil-card-navbar.component';
import { ClientNavbarComponent } from './components/navbarComponents/client-navbar/client-navbar.component';
import { ProviderNavbarComponent } from './components/navbarComponents/provider-navbar/provider-navbar.component';
import { LockNavbarComponent } from './components/navbarComponents/lock-navbar/lock-navbar.component';
import { NavbarCardLockedComponent } from './components/navbarComponents/navbar-card-locked/navbar-card-locked.component';
import { SendStatementComponent } from './pages/send-statement/send-statement.component';
import { PageNameComponent } from './components/universalComponents/page-name/page-name.component';
import { InformationPageComponent } from './components/universalComponents/information-page/information-page.component';
import { InformationCardComponent } from './components/universalComponents/information-card/information-card.component';
import { IndiceComponent } from './components/universalComponents/indice/indice.component';
import { SearchBarComponent } from './components/universalComponents/search-bar/search-bar.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AddMeterComponent } from './components/compteurAndDataComp/add-meter/add-meter.component';
import { SendCompteurDataComponent } from './components/compteurAndDataComp/send-compteur-data/send-compteur-data.component';
import { ReceivedStatementComponent } from './pages/received-statement/received-statement.component';
import { OptionChoiceComponent } from './components/universalComponents/option-choice/option-choice.component';
import { ChangePageableComponent } from './components/universalComponents/change-pageable/change-pageable.component';
import { MobileNavbarComponent } from './components/navbarComponents/mobile-navbar/mobile-navbar.component';
import { IndiceListComponent } from './components/universalComponents/indice-list/indice-list.component';
import { DeleteConfirmationComponent } from './components/universalComponents/delete-confirmation/delete-confirmation.component';
import { ModifyMetterComponent } from './components/compteurAndDataComp/modify-metter/modify-metter.component';
import { ShowCompteurPictureComponent } from './components/compteurAndDataComp/show-compteur-picture/show-compteur-picture.component';
import { HomeCardComponent } from './components/universalComponents/home-card/home-card.component';
import { DropdownComponent } from './components/universalComponents/dropdown/dropdown.component';
import { AdminNavbarComponent } from './components/navbarComponents/admin-navbar/admin-navbar.component';
import { FournisseurAddComponent } from './pages/fournisseur-add/fournisseur-add.component';
import { FournisseurInfoComponent } from './pages/fournisseur-info/fournisseur-info.component';
import { FournisseurListComponent } from './pages/fournisseur-list/fournisseur-list.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { LoaderAPIComponent } from './components/universalComponents/loader-api/loader-api.component';

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
}

@NgModule({
  declarations: [
    AppComponent,
    FournisseurAddComponent,
    AdresseAddComponent,
    HomePageComponent,
    NavbarComponent,
    NavbarCardComponent,
    ProfilCardNavbarComponent,
    ClientNavbarComponent,
    ProviderNavbarComponent,
    LockNavbarComponent,
    NavbarCardLockedComponent,
    SendStatementComponent,
    PageNameComponent,
    InformationPageComponent,
    InformationCardComponent,
    IndiceComponent,
    SearchBarComponent,
    ProfilComponent,
    AddMeterComponent,
    SendCompteurDataComponent,
    ReceivedStatementComponent,
    OptionChoiceComponent,
    ChangePageableComponent,
    MobileNavbarComponent,
    IndiceListComponent,
    DeleteConfirmationComponent,
    ModifyMetterComponent,
    ShowCompteurPictureComponent,
    HomeCardComponent,
    DropdownComponent,
    AdminNavbarComponent,
    FournisseurInfoComponent,
    FournisseurListComponent,
    CategoriesComponent,
    LoaderAPIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
