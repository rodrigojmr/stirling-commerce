import { IUser } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ParamsDictionary } from 'express-serve-static-core';
import StatusCodes from 'http-status-codes';
import { IWithUser } from 'server/src/util/constants';
import { JWTClass } from 'server/src/util/jwtService';

const JWTService = new JWTClass();
const { UNAUTHORIZED } = StatusCodes;

// // Middleware to verify if user is an admin
// export const adminMW = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
// try {
//   // Get json-web-token
//   const jwt = req.signedCookies[cookieProps.key];
//   if (!jwt) {
//     throw Error('JWT not present in signed cookie.');
//   }
//   // Make sure user role is an admin
//   const clientData = await JWTService.decodeJwt(jwt);
//   if (clientData.role === UserRoles.Admin) {
//     res.locals.userId = clientData.id;
//     next();
//   } else {
//     throw Error('JWT not present in signed cookie.');
//   }
// } catch (err) {
//   next(err);
//     return res.status(UNAUTHORIZED).json({
//     error: err.message
//   });p
// }
// };

export const authenticateToken = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (
    req: IWithUser<Request<ParamsDictionary>>,
    res: Response,
    next: NextFunction
  ) => {
    // Through authorization header
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // Through HTTP only cookie
    const token = req.signedCookies.token;
    if (!token)
      return res.status(UNAUTHORIZED).json({ error: 'Unauthorized.' });

    // Should not need to handle rejection as asyncHandler does that for us
    const clientData: IUser = await JWTService.decodeJwt(token);
    req.user = clientData;
    next();
  }
);

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return res.json({
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
