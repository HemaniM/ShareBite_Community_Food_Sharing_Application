import { Response } from 'express';
import { AuthRequest } from '../../common/middleware/auth.middleware';
import { logger } from '../../config/logger';
import { acceptRequestSchema, createRequestSchema } from './request.schema';
import { RequestService } from './request.service';

export class RequestController {
  static async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const validatedData = createRequestSchema.parse(req.body);
      const request = await RequestService.createRequest(req.user.id, validatedData);

      return res.status(201).json({
        message: 'Request placed successfully',
        request,
      });
    } catch (error: any) {
      logger.error(`Create Request Error: ${error.message}`);
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(400).json({ message: error.message || 'Unable to create request' });
    }
  }

  static async getByListing(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const listingId = String(req.params.listingId || '');
      const requests = await RequestService.getDonorRequests(req.user.id, listingId);

      return res.status(200).json({ requests });
    } catch (error: any) {
      logger.error(`Get Requests Error: ${error.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async accept(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { requestId } = acceptRequestSchema.parse(req.body);
      const result = await RequestService.acceptRequest(req.user.id, requestId);

      return res.status(200).json({
        message: 'Request accepted successfully',
        approvedRequest: result.approvedRequest,
        listing: result.updatedListing,
        toastNotificationForOtherRequesters: result.notificationMessage,
        impactedRequestCount: result.affectedRequestsCount,
      });
    } catch (error: any) {
      logger.error(`Accept Request Error: ${error.message}`);
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(400).json({ message: error.message || 'Unable to accept request' });
    }
  }
}