import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { WebApiService } from './_services/web-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterViewInit{
  title = 'compteurAppFrontend';
  timer: any;

  // Gere la déconnexion automatique lors de la fermeture du navigateur
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(): void {
    this.logout();
  }

  // Réinitialise le timer à chaque action de l'utilisateur
  @HostListener('window:mousemove')
  @HostListener('window:keypress')
  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.logout(), 300000); // 300000 ms = 5 min
  }

  constructor(private keycloak: KeycloakService, private webApiService: WebApiService) {
    this.resetTimer();
  }
  ngAfterViewInit(): void {
    this.webApiService.syncUser().subscribe();
  }

  logout() {
    this.keycloak.logout().then(() => {
      console.log('Déconnecté');
    });
  }

  ngOnDestroy() {
    var logged = this.keycloak.isLoggedIn().then((authenticated) => {
      if (authenticated) {
        this.unloadNotification();
      }
    });
    clearTimeout(this.timer);
  }
}
