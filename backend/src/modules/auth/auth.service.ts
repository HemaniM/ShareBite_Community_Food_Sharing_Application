import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../user/user.model';
import { RegisterDto, LoginDto } from './auth.schema';
import { ENV } from '../../config/env';

export class AuthService {

  static async register(data: RegisterDto): Promise<IUser> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  static async login(data: LoginDto): Promise<{ token: string; user: IUser }> {
    // 1. Explicitly select password since some DB configs exclude it by default
    const user = await User.findOne({ email: data.email }).select('+password');

    // 2. Check if user exists AND if they have a password (handles OAuth cases safely)
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    // 3. Now TS knows 'user.password' is definitely a string
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // 4. Use the centralized ENV variable
    const token = jwt.sign(
      { id: user._id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { token, user };
  }
}