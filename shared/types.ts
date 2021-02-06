export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}
export interface IUser {
  id: number;
  email: string;
  name: string;
  role?: string;
}
