import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { WebApiService } from 'src/app/_services/web-api.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  message: string = 'null';

  constructor(private webApiService: WebApiService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.webApiService.syncUser().subscribe();
  }
}
