import express from 'express';
import assetsRoutes from './assets.routes';
import licensesRoutes from './licenses.routes';
import developersRoutes from './developers.routes';
import authenticateUser from '../middlewares/authenticateUser';
import login from './auth.routes';

const router = express.Router();


router.use('/auth', login);
router.use(authenticateUser);
router.use('/assets', assetsRoutes);
router.use('/licenses', licensesRoutes);
router.use('/developers', developersRoutes);

export default router;
