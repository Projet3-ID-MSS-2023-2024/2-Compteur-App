export class FactureDTO {
  etat?: string;
  prix?: number;
  idCompteurData?: number;

  constructor(etat: string, prix: number, idCompteurData: number) {
    this.etat = etat;
    this.prix = prix;
    this.idCompteurData = idCompteurData;
  }
}

