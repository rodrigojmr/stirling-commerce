import { Request } from 'express';

// Strings
export const paramMissingError =
  'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;

// Cookie Properties
export const cookieProps = Object.freeze({
  key: 'token',
  secret: process.env.COOKIE_SECRET,
  options: {
    httpOnly: true,
    signed: true,
    path: process.env.COOKIE_PATH,
    maxAge: Number(process.env.COOKIE_EXP),
    domain: process.env.COOKIE_DOMAIN,
    secure: process.env.SECURE_COOKIE === 'true'
  }
});

// IRequest object for express routes
export interface SignupRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
export interface ClientRequest extends Request {
  user?: IClientData;
}

export interface IClientData {
  email: string;
  id: number;
  role?: number;
}
