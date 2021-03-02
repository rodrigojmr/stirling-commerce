import {
  fetchAllProducts,
  fetchProduct
} from '../controllers/productController';
import asyncHandler from 'express-async-handler';
import { cookieProps } from '@util/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@util/jwtService';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { signUpUser, signInUser } from '../controllers/userController';

const router = Router();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;
const JWTService = new JWTClass();

router.get('/all', fetchAllProducts);
router.get('/:id', fetchProduct);

export default router;
