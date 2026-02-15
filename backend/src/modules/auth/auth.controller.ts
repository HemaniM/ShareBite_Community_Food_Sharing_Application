import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';
import { logger } from '../../config/logger';

export class AuthController {

  // @route   POST /api/auth/register
  static async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await AuthService.register(validatedData);

      // Return user without password
      const userResponse = user.toObject();
      // @ts-ignore - password exists on the object before deletion
      delete userResponse.password;

      res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error: any) {
      logger.error(`Register Error: ${error.message}`);
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors });
      }
      if (error.message === 'User already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // @route   POST /api/auth/login
  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { token, user } = await AuthService.login(validatedData);

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
      });
      logger.info(`Login Successful: ${user._id}`);
    } catch (error: any) {
      logger.error(`Login Error: ${error.message}`);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}