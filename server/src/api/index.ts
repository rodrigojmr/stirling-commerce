import { Router } from 'express';
import UserRouter from './user';
import AuthRouter from './auth';
import ProductRouter from './product';
import OrderRouter from './order';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/products', ProductRouter);
router.use('/orders', OrderRouter);
router.get('/hello', (req, res) => {
  return res.send('Hello');
});

// Export the base-router
export default router;
