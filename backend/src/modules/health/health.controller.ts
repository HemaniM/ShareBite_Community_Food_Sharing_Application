import { Request, Response } from 'express';
import { HealthService } from './health.service';

export class HealthController {
  static check(req: Request, res: Response) {
    res.json(HealthService.getStatus());
  }
}
