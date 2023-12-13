export class Facture {
  numFacture?: string;
  nomCompteur?: string;
  nomFournisseur?: string;
  numTva?: string;
  date?: string;
  prix?: number;

  constructor(numFacture: string, nomCompteur: string, nomFournisseur: string, numTva: string, date: string, prix: number) {
   this.numFacture = numFacture;
    this.nomCompteur = nomCompteur;
    this.nomFournisseur = nomFournisseur;
    this.numTva = numTva;
    this.date = date;
    this.prix = prix;
  }
}

