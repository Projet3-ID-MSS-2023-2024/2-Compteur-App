export class addAdresse {
  rue?: string;
  numero?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;

  constructor(ville: string, pays: string, codePostal: string, rue: string, numero: string) {
    this.rue = rue;
    this.numero = numero;
    this.codePostal = codePostal;
    this.ville = ville;
    this.pays = pays;
  }
}

