import { Model, Modifiers } from 'objection';

export enum UserRoles {
  Standard,
  Admin
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  pwdHash: string;
  role: UserRoles;
}

export default class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  role!: UserRoles;
  pwdHash!: string;

  static get tableName() {
    return 'users';
  }
}
