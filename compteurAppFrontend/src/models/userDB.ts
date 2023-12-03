import { Adresse } from "./adresse";

export class UserDB {
  id: number | undefined;
  categoryId: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  role: string | undefined;
  tva: string | undefined;
  userName: string | undefined;
  adresse: Adresse | undefined;
}
