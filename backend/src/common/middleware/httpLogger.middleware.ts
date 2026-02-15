import morgan from 'morgan';
import { logger } from '../../config/logger';
import { ENV } from '../../config/env';

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const skip = (_req: any, res: any) => {
  return res.statusCode < 400;
};

export const httpLogger =
  ENV.NODE_ENV === 'production'
    ? morgan('combined', { stream })
    : morgan(':method :url :status :response-time ms', {
        stream,
        skip: (req) => req.url === '/favicon.ico',
      });
