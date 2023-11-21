export class UserAdd {
  username?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  credentials?: Credential[];
  attributes?: {
    phoneNumber: any;
    birthday: any;
    role: any;
  };
}

export class Credential {
  type?: string; // password
  value?: string;
  temporary?: boolean; // false
}
