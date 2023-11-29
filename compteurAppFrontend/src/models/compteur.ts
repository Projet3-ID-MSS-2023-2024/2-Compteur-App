export class Compteur {
  id?: string;
  nom!: string;
  id_user!: number;
  id_fournisseur!: number;
  id_adresse!: number;
  id_category!: number;

  constructor(nom: string, id_user: number, id_fournisseur:number ,id_adresse: number, id_categorie: number, id?: string) {
    this.id = id;
    this.nom = nom;
    this.id_user = id_user;
    this.id_fournisseur = id_fournisseur;
    this.id_adresse = id_adresse;
    this.id_category = id_categorie;
  }
}
