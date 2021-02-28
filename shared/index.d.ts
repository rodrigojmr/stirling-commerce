import { IUser } from './types';

declare namespace Express {
  interface Request {
    user?: IUser;
  }
}
