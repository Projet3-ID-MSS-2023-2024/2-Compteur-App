export class CompteurDataReq {
  id!:number;
  valeur!:number;
  photo!:string;
  client!:string;
  provider!:string;
  date!:string;

  constructor(valeur:number, photo:string, client:string, provider:string, date:string) {
    this.valeur = valeur;
    this.photo = photo;
    this.client = client;
    this.provider = provider;
    this.date = date;
  }

}
