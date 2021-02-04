import {
  cookieProps,
  loginFailedErr,
  paramMissingError,
  pwdSaltRounds,
  SignupRequest
} from '@servershared/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@servershared/jwtService';
import bcrypt from 'bcrypt';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();
// const userDao = new UserDao();
const JWTService = new JWTClass();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;

export const signUpUser = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: SignupRequest, res: Response) => {
    const { name, email, password } = req.body;
    if (!(email && password)) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }

    const passwordHash = await bcrypt.hash(password, pwdSaltRounds);

    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     passHash: passwordHash
    //   }
    // });

    // res.send(user);
    //   // Setup Admin Cookie
    const token = await JWTService.getJwt({
      email: email,
      id: 1
    });

    res.send(token);
    const { key, options } = cookieProps;
    res.cookie(key, token, options);
    return res.json({ token });
  }
);

// export const signInUser = asyncHandler(
//   async (req: SignupRequest, res: Response) => {

//   // Fetch user
//     const user = await userDao.getOne(email);
//     if (!user) {
//       return res.status(UNAUTHORIZED).json({
//         error: loginFailedErr
//       });
//     }
//     // Check password
//     const pwdPassed = await bcrypt.compare(password, user.pwdHash);
//     if (!pwdPassed) {
//       return res.status(UNAUTHORIZED).json({
//         error: loginFailedErr
//       });
//     }
