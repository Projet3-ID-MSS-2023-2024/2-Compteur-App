export class Facture {
  id?: string | undefined;
  nomCompteur?: string | undefined;
  nomProvideur?: string | undefined;
  TVA?: string | undefined;
  date?: string | undefined;
  prix?: number | undefined;

  constructor(id: string, nomCompteur: string, nomProvideur: string, TVA: string, date: string, prix: number) {
   this.id = id;
    this.nomCompteur = nomCompteur;
    this.nomProvideur = nomProvideur;
    this.TVA = TVA;
    this.date = date;
    this.prix = prix;
  }
}

