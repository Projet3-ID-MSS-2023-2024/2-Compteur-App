export class Facture {
  id?: string;
  nomCompteur?: string;
  nomProvideur?: string;
  TVA?: string;
  date?: string;
  prix?: number;

  constructor(id: string, nomCompteur: string, nomProvideur: string, TVA: string, date: string, prix: number) {
   this.id = id;
    this.nomCompteur = nomCompteur;
    this.nomProvideur = nomProvideur;
    this.TVA = TVA;
    this.date = date;
    this.prix = prix;
  }
}

