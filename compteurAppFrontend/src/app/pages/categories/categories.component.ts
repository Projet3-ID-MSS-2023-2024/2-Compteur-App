import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';
import { Observable, map, startWith } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FournisseurService } from 'src/app/_services/fournisseur.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories$!: Observable<any[]>;
  public selectedCategoryId: number | null = null;
  private destroy$ = new Subject<void>();
  selectedCategory!: Category;
  displayPopup = false;

  constructor(
    private categoryService: CategoryService,
    private fournisseurService: FournisseurService
    ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAll().pipe(
      map(data => data.map((category, index) => ({id: category.id, index: (index + 1).toString(), name: category.name}))),
      takeUntil(this.destroy$)
    );
  }

  closeDelete(): void {
    this.selectedCategoryId = null;
    this.displayPopup = false;
  }

  openDelete(category: Category) {
    console.log('openDelete method called with category:', category);
    this.displayPopup = true;
    this.selectedCategory = category;
  }


  deleteMessageSucces = ""
  deleteMessageError = ""

  deleteCategory(id: number | undefined): void {
    this.fournisseurService.getUserByCategoryId(id).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        console.log(data);
        if(data.length == 0) {
          console.log(data)
          this.categoryService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(
            () => this.loadCategories(),
            error => console.error(error)
          );
          this.loadCategories();
          this.deleteMessageSucces = "La catégorie a bien été supprimée"
          this.deleteMessageError = ""
          this.closeDelete();
        } else {
          this.closeDelete();
          this.deleteMessageError = "Vous ne pouvez pas supprimer cette catégorie car elle contient des utilisateurs"
          this.deleteMessageSucces = ""
        }
      },
      error => console.error(error)
    );

  }

  categoryName = '';

  onSubmit(): void {
    if(this.categoryName != '') {
      this.categoryService.create(this.categoryName).pipe(takeUntil(this.destroy$)).subscribe(
        () => this.loadCategories(),
        error => console.error(error)
      );
    }
  }
}
