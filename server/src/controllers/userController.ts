import { PrismaClient } from '@prisma/client';
import {
  cookieProps,
  loginFailedErr,
  paramMissingError,
  pwdSaltRounds,
  SignupRequest,
  userNotFound
} from '@servershared/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@servershared/jwtService';
import bcrypt from 'bcrypt';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';
import { LoginRequest } from './../shared/constants';

const prisma = new PrismaClient();

const router = Router();
// const userDao = new UserDao();
const JWTService = new JWTClass();
const { BAD_REQUEST, OK, UNAUTHORIZED, NOT_FOUND } = StatusCodes;

export const signUpUser = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: SignupRequest, res: Response) => {
    const { name, email, password } = req.body;
    if (!(email && password)) {
      res.status(BAD_REQUEST);
      throw new Error(paramMissingError);
    }

    const passwordHash = await bcrypt.hash(password, pwdSaltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passHash: passwordHash
      }
    });

    // Generate JWT
    const { key, options } = cookieProps;
    const token = await JWTService.getJwt({
      id: 1,
      name: user.name,
      email: user.email,
      role: user.role
    });
    // Set as cookie

    res.cookie(key, token, options);
    return res.json({
      token,
      user: { id: user.id, name: user.name }
    });
  }
);

export const signInUser = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: LoginRequest, res: Response) => {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      res.status(NOT_FOUND);
      new Error(userNotFound);
    }

    // Typescript complains otherwise
    if (!user?.passHash) {
      res.status(BAD_REQUEST);
      throw new Error('User does not have password set.');
    }

    // Check password
    const pwdPassed = await bcrypt.compare(password, user?.passHash);
    if (!pwdPassed) {
      res.status(UNAUTHORIZED);
      throw new Error(loginFailedErr);
    }

    // Generate JWT
    const { key, options } = cookieProps;
    const token = await JWTService.getJwt({
      id: 1,
      name: user.name,
      email: user.email,
      role: user.role
    });
    // Set as cookie
    res.cookie(key, token, options);
    return res.json({
      token,
      user: { id: user.id, name: user.name }
    });
  }
);
