export class AddFournisseur {
  username?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  credentials?: Credential[];
  attributes?: {
    tvaNumber: any;
    phoneNumber: any;
    role: any;
  };
}

export class Credential {
  type?: string; // password
  value?: string;
  temporary?: boolean; // false
}
