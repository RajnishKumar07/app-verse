export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  __v: number;
  passwordToken: string;
  passwordTokenExpirationDate: string;
}

export interface IUpdateDetail {
  role: string;
  user: string;
  userId: number | null;
}
