import asyncHandler from 'express-async-handler';
import { cookieProps } from 'server/src/util/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from 'server/src/util/jwtService';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { signUpUser, signInUser } from '../controllers/userController';

// import {
//   paramMissingError,
//   loginFailedErr,
//   cookieProps,
//   IRequest
// } from '@shared/constants';
const router = Router();
// const userDao = new UserDao();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;
const JWTService = new JWTClass();

/******************************************************************************
 *                      Signup User - "POST /api/auth/signup"
 ******************************************************************************/

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.get(
  '/me',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  asyncHandler(async (req: Request, res: Response) => {
    const token = req?.signedCookies?.token;
    if (!token) {
      res.status(StatusCodes.NOT_FOUND).json({});
    } else {
      const clientData = await JWTService.decodeJwt(token);
      res.json(clientData);
    }
  })
);

/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.post('/logout', (req: Request, res: Response) => {
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
