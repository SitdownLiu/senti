export interface User {
  id: string;
  name: string;
  account: string;
  password: string;
  idCard: string;
  phone: string;
  email: string;
  source?: string;
  roles?: object;
  accessToken?: string;
}
