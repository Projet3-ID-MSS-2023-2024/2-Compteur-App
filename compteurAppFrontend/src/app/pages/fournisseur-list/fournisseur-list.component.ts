import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryService } from 'src/app/_services/category.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { MessageService } from 'src/app/_services/message.service';
import { AddFournisseurSpring } from 'src/models/add-fournisseur-spring';
import { Category } from 'src/models/category';
import { Observable } from 'rxjs';
import { UserDBService } from 'src/app/_services/userDB.service';
import { UserDB } from 'src/models/userDB';
import { User } from 'src/models/user';

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
  filterData: UserDB[] = [];
  fournisseurData: UserDB[] = [];

  userDB!: UserDB[];

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private userDBService: UserDBService
  ) {}

  ngOnInit(): void {
    this.initCategories();
    this.initFournisseurs();
    this.messageService.currentMessage.subscribe(message => this.message = message);
    this.messageService.currentPopup.subscribe(closeOrOpenPopup => this.closeOrOpenPopup = closeOrOpenPopup);
    // Initialiser un événement avec une valeur de 0
    const event = { target: { value: 0 } };
    this.filterByCategory(event);
  }


  initFournisseurs() {
    this.fournisseurData$ = this.userDBService.getAllProviders();
    this.fournisseurData$.subscribe((data: any) => {
      this.fournisseurData = data;
      this.filterData = [...data];
      this.saveFilterDataByCategory = [...this.fournisseurData];
    });
  }

  initCategories() {
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

  saveFilterDataByCategory: UserDB[] =  []

filterByCategory(event: any) {
  console.log(event.target.value);
  if (event.target.value == 0) {
    this.filterData = [...this.fournisseurData];

  } else {
    this.filterData = this.fournisseurData.filter((fournisseur) => {
      return fournisseur.category.id == event.target.value;
    });
    console.log(this.filterData);
    this.saveFilterDataByCategory = [...this.filterData];
  }
}

searchFournisseur() {
  if (this.searchValue.length == 0)
  {
    this.filterData = [...this.saveFilterDataByCategory];
  } else {
    this.filterData = this.saveFilterDataByCategory.filter((fournisseur) =>
      fournisseur.username?.toLowerCase().includes(this.searchValue.toLowerCase())
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
