import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';
import { Observable, map, startWith } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories$!: Observable<any[]>;
  public selectedCategoryId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(private categoryService: CategoryService) { }

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
  }

  openDelete(id: number): void {
    this.selectedCategoryId = id;
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.closeDelete();
        this.loadCategories();
      },
      error => console.error(error)
    );
  }

  categoryName = '';

  onSubmit(): void {
    this.categoryService.create(this.categoryName).pipe(takeUntil(this.destroy$)).subscribe(
      () => this.loadCategories(),
      error => console.error(error)
    );
  }
}
