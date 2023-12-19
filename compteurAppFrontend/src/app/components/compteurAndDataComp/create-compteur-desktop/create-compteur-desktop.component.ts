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
    numero: new FormControl('', Validators.required),

    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    fournisseur: new FormControl('', Validators.required),
  });

  dataSender() {
    let data:any[] = [];
    if (this.dataSend.valid) {
      let adresse:Adresse = new Adresse(
        this.dataSend.value.ville!,
        this.dataSend.value.pays!,
        this.dataSend.value.codePostal!,
        this.dataSend.value.rue!,
        this.dataSend.value.numero!,
        0
      )
      let compteur = {
        nom: this.dataSend.value.nom!,
        categorie: this.dataSend.value.categorie!,
        fournisseur: this.dataSend.value.fournisseur!,
      };
      data = [compteur, adresse];
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
