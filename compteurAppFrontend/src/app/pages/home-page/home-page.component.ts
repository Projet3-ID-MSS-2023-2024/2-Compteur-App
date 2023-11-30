import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{



  ngOnInit() {

  }
}
