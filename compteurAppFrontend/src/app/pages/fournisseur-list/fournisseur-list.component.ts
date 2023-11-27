import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { MessageService } from 'src/app/_services/message.service';
import { AddFournisseur } from 'src/models/add-fournisseur';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css'],
})
export class FournisseurListComponent implements OnInit {
  authenticated = false;
  isAdmin = false;
  isFournisseur = false;
  isClient = false;

  fournisseurData: AddFournisseurSpring[] = [];
  filterData: AddFournisseurSpring[] = [];

  constructor(
    private readonly keycloak: KeycloakService,
    private route: Router,
    private fournisseurService: FournisseurService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  message!: string;
  closeOrOpenPopup!: boolean;
  public categories: Category[] = [];
  public categoriesName: string[] = [];

  ngOnInit(): void {
    this.fournisseurService.getFournisseurSpring().subscribe((data: any) => {
      this.fournisseurData = data;
      this.filterData = [...this.fournisseurData];
      console.log(this.fournisseurData);
    });

    this.messageService.currentMessage.subscribe(message => this.message = message);
    this.messageService.currentPopup.subscribe(popup => this.closeOrOpenPopup = popup);


    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data;
        console.log(data[0]['name']);
        this.categoriesName.push('Tout');
        this.categories.forEach((category) => {
          if (category.name) {
            this.categoriesName.push(category.name);
          }
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchBarDataReceip(data: any) {
    if (data.search == '') {
      this.filterData = [...this.fournisseurData];
    } else {
      this.filterData = this.fournisseurData.filter((fournisseur) => {
        if (
          fournisseur.userName
            ?.toLowerCase()
            .includes(data.search.toLowerCase())
        ) {
          console.log(fournisseur.userName == data.search);
          return fournisseur;
        } else
          console.log(
            'From list' + fournisseur.userName + 'From search' + data.search
          );
        return null;
      });
    }
  }

  filterByCategory(event: any) {
    const category = event.target.value;
    if (category == 'Tout') {
      this.filterData = [...this.fournisseurData];
    } else {
      this.categoryService.getAll().subscribe(
        (data: any) => {
          this.filterData = this.fournisseurData.filter((fournisseur) => {
            let categoryFournisseur = data.find(
              (cat: { id: string | undefined }) =>
                cat.id == fournisseur.idCategory
            );
            return (
              categoryFournisseur &&
              categoryFournisseur.name.toLowerCase() == category.toLowerCase()
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  items = ['Tout', 'Eau', 'Gaz', 'Électricité'];

  goToFournisseurInfo(userName: string | undefined) {
    this.route.navigate(['/fournisseur-info', userName]);
  }



  closePopup() {
    this.messageService.changePopup(false);
  }
}
