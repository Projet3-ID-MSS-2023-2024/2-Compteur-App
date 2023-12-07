import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addAdresse } from 'src/models/add-adresse';
import { Adresse } from 'src/models/adresse';
import { Category } from 'src/models/category';
import { Compteur } from 'src/models/compteur';
import { UserDB } from 'src/models/userDB';

@Component({
  selector: 'app-create-compteur-desktop',
  templateUrl: './create-compteur-desktop.component.html',
  styleUrls: ['./create-compteur-desktop.component.css']
})
export class CreateCompteurDesktopComponent {

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  @Input() category: Category[] = [];
  @Input() provider: UserDB[] = [];
  adresse!:Adresse;
  compteur!:Compteur;

  selectedCategory!: number;
  filteredProviders!: UserDB[];

  dataSend = new FormGroup({
    pays: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    codePostal: new FormControl('', Validators.required),
    rue: new FormControl('', Validators.required),
    numeros: new FormControl('', Validators.required),

    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    fournisseur: new FormControl('', Validators.required),
  });

  dataSender(choice: boolean) {
    let data: any = [choice];
    if (choice) {
      data.push(this.dataSend.value);
    }
    this.sendData.emit(data);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategoryId = Number(selectElement.value);
    const selectedCategoryName = this.category.find(item => item.id === selectedCategoryId)?.name;
    if(selectedCategoryName) {
      this.updateSelectedCategory(selectedCategoryName);
    }
  }

  updateSelectedCategory(categoryName: string) {
    this.filteredProviders = this.provider.filter(provider => provider.category.name === categoryName);
  }

}
