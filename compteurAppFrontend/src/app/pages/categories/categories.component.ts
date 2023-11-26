import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  public categories: any[] = [];

  constructor(
    private categroyService: CategoryService,
  ) { }

ngOnInit(): void {
  this.categroyService.getAll().subscribe(
    data => {
      this.categories = data.map((category, index) => [category.id, (index + 1).toString(), category.name]);
    },
    error => {
      console.log(error);
    }
  );
}


  attributLegend = ['N°', 'Nom'];
  buttonOption = ['delete.svg'];

  closeOrOpenDelete:boolean = false;
  idFocus!:number;

  buttonPress(arrayData: any){
    switch(arrayData[0]){
      case 'btn1':
        this.closeOrOpenDelete = true;
        break;
    }
    this.idFocus = arrayData[1];
  }

  closeDelete(){
    this.closeOrOpenDelete = false;
  }

  deleteCategory(){
    this.categroyService.delete(this.idFocus).subscribe(
      data => {
        this.closeDelete();
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  categoryName: string = '';

  onSubmit() {
    this.categroyService.create(this.categoryName).subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }
}
