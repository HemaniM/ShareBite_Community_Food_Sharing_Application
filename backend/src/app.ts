import express from 'express';
import { healthRouter } from './modules/health/health.route';
import { errorMiddleware } from './common/middleware/error.middleware';
import { httpLogger } from './common/middleware/httpLogger.middleware';
import { authRouter } from './modules/auth/auth.route';

export const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use(httpLogger);
app.get('/favicon.ico', (_req, res) => res.status(204));
app.use('/health', healthRouter);

app.use(errorMiddleware);
