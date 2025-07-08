import { Router } from 'express';
import authRouter from './auth';
import simulationsRouter from './simulations';

const router = Router();

router.use('/auth', authRouter);
router.use('/simulations', simulationsRouter);

export default router;