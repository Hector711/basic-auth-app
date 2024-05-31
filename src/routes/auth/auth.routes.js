import { Router } from 'express';
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from './auth.controller.js';
import { validateToken } from '../../middlewares/validateToken.middleware.js';
import { validateData } from '../../middlewares/validateData.middleware.js';
import { registerSchema, loginSchema } from '../../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateData(registerSchema), register);

router.post('/login', validateData(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);
// rutas protegidas mediante el middleware authRequired

router.get('/profile', validateToken, profile);

export default router;
