import express from 'express';
import cors from "cors";
import { healthRouter } from './modules/health/health.route';
import { errorMiddleware } from './common/middleware/error.middleware';
import { httpLogger } from './common/middleware/httpLogger.middleware';
import { authRouter } from './modules/auth/auth.route';
import { listingsRouter } from './modules/listings/listings.route';
import { requestRouter } from './modules/request/request.route';
import { userRouter } from './modules/user/user.route';

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/api/auth', authRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/requests', requestRouter);
app.use('/api/users', userRouter);
app.use(httpLogger);
app.get('/favicon.ico', (_req, res) => res.status(204));
app.use('/health', healthRouter);

app.use(errorMiddleware);
