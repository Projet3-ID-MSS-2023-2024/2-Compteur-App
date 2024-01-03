import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { UserDBService } from 'src/app/_services/userDB.service';
import { UserDB } from 'src/models/userDB';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  constructor(
    private keycloak: KeycloakService,
    private service: UserDBService
  ) {}

  clients: Observable<UserDB[]> = new Observable<UserDB[]>();

  ngOnInit(): void {
    this.initClientList();
  }
  async initClientList() {
    const profile = await this.keycloak.loadUserProfile();

    this.clients = await this.service.getClientsByProviderId(profile.id);
  }
}
