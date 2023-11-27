export class Compteur {
  id?: number;
  nom!: string;
  id_user!: number;
  id_fournisseur!: number;
  id_adresse!: number;
  id_categorie!: number;

  constructor(nom: string, id_user: number, id_fournisseur:number ,id_adresse: number, id_categorie: number, id?: number) {
    this.id = id;
    this.nom = nom;
    this.id_user = id_user;
    this.id_fournisseur = id_fournisseur;
    this.id_adresse = id_adresse;
    this.id_categorie = id_categorie;
  }
}
