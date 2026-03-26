import { Router } from 'express';
import { protect } from '../../common/middleware/auth.middleware';
import { RequestController } from './request.controller';

export const requestRouter = Router();

requestRouter.post('/', protect, RequestController.create);
requestRouter.get('/mine', protect, RequestController.getMine);
requestRouter.delete('/:requestId', protect, RequestController.deleteMine);
requestRouter.get('/listing/:listingId', protect, RequestController.getByListing);
requestRouter.get('/history', protect, RequestController.getHistoryOverview);
requestRouter.get(
  '/history/listing/:listingId',
  protect,
  RequestController.getHistoryByListing,
);
requestRouter.patch('/accept', protect, RequestController.accept);
requestRouter.patch('/reject', protect, RequestController.reject);