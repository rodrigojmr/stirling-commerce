import asyncHandler from 'express-async-handler';
import { cookieProps } from '@servershared/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@servershared/jwtService';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { signUpUser, signInUser } from './../controllers/userController';

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
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

// router.post('/login', async (req: IRequest, res: Response) => {
//   // Check email and password present
//   const { email, password } = req.body;

//   if (!(email && password)) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError
//     });
//   }
//   // Fetch user
//   const user = await userDao.getOne(email);
//   if (!user) {
//     return res.status(UNAUTHORIZED).json({
//       error: loginFailedErr
//     });
//   }
//   // Check password
//   const pwdPassed = await bcrypt.compare(password, user.pwdHash);
//   if (!pwdPassed) {
//     return res.status(UNAUTHORIZED).json({
//       error: loginFailedErr
//     });
//   }
//   // Setup Admin Cookie
//   const jwt = await JWTService.getJwt({
//     id: user.id,
//     role: user.role
//   });
//   const { key, options } = cookieProps;
//   res.cookie(key, jwt, options);
//   // Return
//   return res.status(OK).end();
// });

/******************************************************************************
 *                      Signup User - "POST /api/auth/signup"
 ******************************************************************************/

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.get(
  '/me',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) return;

    // Should not need to handle rejection as asyncHandler does that for us
    const clientData = await JWTService.decodeJwt(token);
    res.json(clientData);
  })
);

/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get('/logout', (req: Request, res: Response) => {
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
