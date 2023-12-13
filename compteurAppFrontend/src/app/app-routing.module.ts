import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/authGuard';
import { FournisseurAddComponent } from './pages/fournisseur-add/fournisseur-add.component';
import { AdresseAddComponent } from './adresse-add/adresse-add.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SendStatementComponent } from './pages/send-statement/send-statement.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ReceivedStatementComponent } from './pages/received-statement/received-statement.component';
import { FournisseurInfoComponent } from './pages/fournisseur-info/fournisseur-info.component';
import { FournisseurListComponent } from './pages/fournisseur-list/fournisseur-list.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FactureComponent } from './pages/facture/facture.component';
import { FactureProviderComponent } from './pages/facture-provider/facture-provider.component';
import {HistoryFactureClientComponent} from "./pages/history-facture-client/history-facture-client.component";

const routes: Routes = [
  {path: '', redirectTo: 'homePage', pathMatch: 'full'},
  {path: 'addFournisseur', component: FournisseurAddComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'listFournisseur', component: FournisseurListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'addAdresse', component: AdresseAddComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'fournisseur-info/:userName', component: FournisseurInfoComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'homePage', component: HomePageComponent},
  {path: 'send-statement', component: SendStatementComponent},
  {path: 'received-statement', component: ReceivedStatementComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'facture', component: FactureComponent },
  {path: 'history-facture-client', component: HistoryFactureClientComponent},
  {path: 'facture-provider', component: FactureProviderComponent },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
