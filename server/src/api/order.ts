// import UserDao from '@daos/User/UserDao.mock';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { submitOrder } from '../controllers/orderController';
import { signUpUser, signInUser } from '../controllers/userController';
import { authenticateToken } from './middleware';

const router = Router();

router.post('/submit', authenticateToken, submitOrder);

export default router;
