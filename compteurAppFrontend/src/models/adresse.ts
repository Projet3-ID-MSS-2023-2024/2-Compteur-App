export class Adresse {
  rue?: string;
  numero?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  id?: number;

  constructor(id:number,ville: string, pays: string, codePostal: string, rue: string, numero: string) {
    this.rue = rue;
    this.numero = numero;
    this.codePostal = codePostal;
    this.ville = ville;
    this.pays = pays;
    this.id = id;
  }
}

