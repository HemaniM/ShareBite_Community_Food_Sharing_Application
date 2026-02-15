import { Router } from 'express';
import { AuthController } from './auth.controller';
import { protect, AuthRequest } from '../../common/middleware/auth.middleware';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

authRouter.get('/me', protect, (req: AuthRequest, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});