import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { MessageService } from 'src/app/_services/message.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css'],
})
export class FournisseurListComponent implements OnInit {
  searchValue = '';
  message!: string;
  closeOrOpenPopup!: boolean;
  categories$!: Observable<Category[]>;
  categories: any = [];
  fournisseurData$!: Observable<AddFournisseurSpring[]>;
  filterData: AddFournisseurSpring[] = [];
  fournisseurData: AddFournisseurSpring[] = [];

  constructor(
    private readonly keycloak: KeycloakService,
    private route: Router,
    private fournisseurService: FournisseurService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initCategories();
    this.initFournisseurs();
    this.messageService.currentMessage.subscribe(message => this.message = message);
    this.messageService.currentPopup.subscribe(closeOrOpenPopup => this.closeOrOpenPopup = closeOrOpenPopup);
  }


  private initFournisseurs() {
    this.fournisseurData$ = this.fournisseurService.getFournisseurSpring();
    this.fournisseurData$.subscribe((data: any) => {
      this.fournisseurData = data;
      this.filterData = [...data];
    });
  }

  private initCategories() {
    this.categories$ = this.categoryService.getAll();
    this.categories$.subscribe((data: any) => {
      this.categories.push({id: 'all', name: 'Tout'});
      data.forEach((category: Category) => {
        if (category.name) {
          this.categories.push({id: category.id, name: category.name});
        }
      });
    });

    console.log(this.categories);
  }


  filterByCategory(event: any) {
    if (event.target.value == 0) {
      this.filterData = [...this.fournisseurData];
    } else {
      this.filterData = this.fournisseurData.filter((fournisseur) => {
        return fournisseur.idCategory == event.target.value;
      });
      console.log(this.filterData);
    }
  }

  searchFournisseur() {
    if (!this.searchValue) {
      this.filterData = [...this.fournisseurData];
    } else {
      this.filterData = this.fournisseurData.filter((fournisseur) =>
        fournisseur.userName?.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  }

  goToFournisseurInfo(userName: string | undefined) {
    this.route.navigate(['/fournisseur-info', userName]);
  }

  closePopup() {
    this.messageService.changePopup(false);
  }
}
