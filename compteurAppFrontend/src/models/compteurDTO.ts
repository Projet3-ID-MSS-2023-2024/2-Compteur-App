export class CompteurDTO {
  id!: number;
  nom!: string;
  nom_user!: string;
  nom_fournisseur!: string;
  nom_category!: string;

  constructor(id: number, nom: string, user: string, fournisseur:string , categorie: string) {
    this.id = id;
    this.nom = nom;
    this.nom_user = user;
    this.nom_fournisseur = fournisseur;
    this.nom_category = categorie;
  }
}
