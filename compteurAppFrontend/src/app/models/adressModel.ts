export class Adresse {
  id!: number;
  rue!: string;
  numero!: string;
  codePostal!: string;
  ville!: string;
  pays!: string;

  constructor(ville: string, pays: string, codePostal: string, rue: string, numero: string) {
    this.ville = ville;
    this.pays = pays;
    this.codePostal = codePostal;
    this.rue = rue;
    this.numero = numero;
  }
}
