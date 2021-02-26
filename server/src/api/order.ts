// import UserDao from '@daos/User/UserDao.mock';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { fetchOrder, submitOrder } from '../controllers/orderController';
import { signUpUser, signInUser } from '../controllers/userController';
import { authenticateToken } from './middleware';

const router = Router();

router.get('/:id', authenticateToken, fetchOrder);
router.post('/submit', authenticateToken, submitOrder);

export default router;
