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
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories$!: Observable<any[]>;
  public selectedCategoryId: number | null = null;
  private destroy$ = new Subject<void>();
  selectedCategory!: Category;
  displayPopupSucces = false;
  displayPopupError = false;

  constructor(
    private categoryService: CategoryService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAll().pipe(
      map((data) =>
        data.map((category, index) => ({
          id: category.id,
          index: (index + 1).toString(),
          name: category.name,
        }))
      ),
      takeUntil(this.destroy$)
    );
  }

  closeDelete(): void {
    this.selectedCategoryId = null;
    this.displayPopupSucces = false;
    this.displayPopupError = false;
  }

  openDelete(category: Category) {
    this.selectedCategory = category;
    this.fournisseurService
      .getUserByCategoryId(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          console.log(data);
          if (data[0] == undefined) {
            this.displayPopupSucces = true;
          } else {
            this.displayPopupError = true;
          }
        },
        (error) => console.error(error)
      );
  }

  deleteCategory(id: number | undefined): void {
    this.categoryService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loadCategories();
          this.displayPopupSucces = false;
        },
        (error) => console.error(error)
      );
  }

  categoryName = '';

  onSubmit(): void {
    if (this.categoryName != '') {
      this.categoryService
        .create(this.categoryName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => this.loadCategories(),
          (error) => console.error(error)
        );
    }
  }
}
