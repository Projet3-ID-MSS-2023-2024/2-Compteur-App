export class CompteurDataSender {
  valeur!:number;
  photo!:File;
  client!:string;
  provider!:string;
  compteur!:string;
  rue!:string;
  numero!:string;
  codePostal!:string;
  ville!:string;
  pays!:string;
  device!:string;

  constructor(valeur:number, photo:File, client:string, provider:string, compteur:string, rue:string, numero:string, codePostal:string, ville:string, pays:string, device:string) {
    this.valeur = valeur;
    this.photo = photo;
    this.client = client;
    this.provider = provider;
    this.compteur = compteur;
    this.rue = rue;
    this.numero = numero;
    this.codePostal = codePostal;
    this.ville = ville;
    this.pays = pays;
    this.device = device;
  }


}
