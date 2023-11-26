import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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

const routes: Routes = [
  {path: '', redirectTo: 'homePage', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'addFournisseur', component: FournisseurAddComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'listFournisseur', component: FournisseurListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'addAdresse', component: AdresseAddComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'fournisseur-info/:userName', component: FournisseurInfoComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'homePage', component: HomePageComponent},
  {path: 'send-statement', component: SendStatementComponent},
  {path: 'received-statement', component: ReceivedStatementComponent},
  {path: 'profil', component: ProfilComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
