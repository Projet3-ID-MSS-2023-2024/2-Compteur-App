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

import { DropdownCategoryComponent } from './components/category/dropdown-category/dropdown-category.component';
import { UserDBService } from './_services/userDB.service';
import { AdresseFieldSendDataComponent } from './components/compteurAndDataComp/adresse-field-send-data/adresse-field-send-data.component';
import { CreateCompteurDesktopComponent } from './components/compteurAndDataComp/create-compteur-desktop/create-compteur-desktop.component';
import { EditPopupComponent } from './components/profilComponents/edit-popup/edit-popup.component';
import {FactureComponent} from "./pages/facture/facture.component";
import {PaypalBtnComponent} from "./components/universalComponents/paypal-btn/paypal-btn.component";
import {FactureProviderComponent} from "./pages/facture-provider/facture-provider.component";
import {ShoppingBtnComponent} from "./components/universalComponents/shopping-btn/shopping-btn.component";
import {FactureListComponent} from "./components/universalComponents/facture-list/facture-list.component";
import {PaypalPopUpComponent} from "./components/paypal-pop-up/paypal-pop-up.component";
import {NgxPayPalModule} from "ngx-paypal";
import {NgOptimizedImage} from "@angular/common";
import { HistoryFactureClientComponent } from './pages/history-facture-client/history-facture-client.component';
import { AddFacturePricePopupComponent } from './components/compteurAndDataComp/add-facture-price-popup/add-facture-price-popup.component';
import { FiltreFacturePopupComponent } from './components/compteurAndDataComp/filtre-facture-popup/filtre-facture-popup.component';
import { FactureReiptPopupComponent } from './components/facture-reipt-popup/facture-reipt-popup.component';
import { SimpleLoaderComponent } from './components/universalComponents/simple-loader/simple-loader.component';
import { GestionPdpProfilComponent } from './components/profilComponents/gestion-pdp-profil/gestion-pdp-profil.component';
import { ClientListComponent } from './pages/client-list/client-list.component';

function initializeKeycloak(keycloak: KeycloakService, userDBService: UserDBService) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8082',
          realm: 'compteurapp',
          clientId: 'angular',
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: true,
        },
        shouldAddToken: (request) => {
          const { method, url } = request;

          const isGetRequest = 'GET' === method.toUpperCase();
          const acceptablePaths = ['/assets', '/clients/public'];
          const isAcceptablePathMatch = acceptablePaths.some((path) =>
            url.includes(path)
          );

          return !(isGetRequest && isAcceptablePathMatch);
        },
      })
      .then(() => userDBService.syncUser().toPromise());
}

@NgModule({
  declarations: [
    AppComponent,
    FournisseurAddComponent,
    AdresseAddComponent,
    HomePageComponent,
    NavbarComponent,
    NavbarCardComponent,
    LoaderAPIComponent,
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
    DropdownCategoryComponent,
    AdresseFieldSendDataComponent,
    CreateCompteurDesktopComponent,
    EditPopupComponent,
    FournisseurInfoComponent,
    FournisseurListComponent,
    CategoriesComponent,
    DropdownCategoryComponent,
    PaypalBtnComponent,//alessio
    FactureComponent,//alessio
    FactureProviderComponent,//alessio
    ShoppingBtnComponent,//alessio
    FactureListComponent,//alessio
    PaypalPopUpComponent, HistoryFactureClientComponent, AddFacturePricePopupComponent, FiltreFacturePopupComponent, FactureReiptPopupComponent, SimpleLoaderComponent, GestionPdpProfilComponent, ClientListComponent//alessio
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule,//alessio
    NgOptimizedImage//alessio
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, UserDBService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
