import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { JWTClass } from '@servershared/jwtService';
import StatusCodes from 'http-status-codes';
import { ClientRequest, cookieProps } from '@servershared/constants';
import { resolveSoa } from 'dns';

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
  async (req: ClientRequest, res: Response, next: NextFunction) => {
    // Through authorization header
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // Through HTTP only cookie
    const token = req.cookies.token;
    if (!token)
      return res.status(UNAUTHORIZED).json({ error: 'Unauthorized.' });

    // Should not need to handle rejection as asyncHandler does that for us
    const clientData = await JWTService.decodeJwt(token);
    req.user = clientData;
    next();
  }
);
