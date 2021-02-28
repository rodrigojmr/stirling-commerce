import {
  SignupParams,
  SignInParams,
  IUser,
  SubmitOrderPayload
} from '@shared/types';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { ParamsDictionary } from 'express-serve-static-core';
dotenv.config();
// Strings
export const paramMissingError =
  'One or more of the required parameters was missing.';
export const loginFailedErr = 'Password is incorrect.';
export const userNotFound = 'User with this e-mail was not found.';

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
export type IWithUser<T extends Request> = T & {
  user?: IUser;
};
