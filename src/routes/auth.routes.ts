import express from 'express';
import login from '../controllers/auth/login';

const router = express.Router();

// Create a new asset
router.post('/login', login);

export default router;
