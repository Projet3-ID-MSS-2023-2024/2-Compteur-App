export class AdresseDTO {
  rue?: string;
  numero?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  id?: number;
  idClient?: string;

  constructor(
    ville: string,
    pays: string,
    codePostal: string,
    rue: string,
    numero: string,
    id: number,
    idClient: string
  ) {
    this.rue = rue;
    this.numero = numero;
    this.codePostal = codePostal;
    this.ville = ville;
    this.pays = pays;
    this.id = id;
    this.idClient = idClient;
  }
}
