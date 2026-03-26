import { Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { logger } from "../../config/logger";
import { createRequestSchema, requestActionSchema } from "./request.schema";
import { RequestService } from "./request.service";

export class RequestController {
  static async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const validatedData = createRequestSchema.parse(req.body);
      const request = await RequestService.createRequest(
        req.user.id,
        validatedData,
      );

      return res.status(201).json({
        message: "Request placed successfully",
        request,
      });
    } catch (error: any) {
      logger.error(`Create Request Error: ${error.message}`);
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      return res
        .status(400)
        .json({ message: error.message || "Unable to create request" });
    }
  }

  static async getMine(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const requests = await RequestService.getRequesterRequests(req.user.id);
      return res.status(200).json({ requests });
    } catch (error: any) {
      logger.error(`Get My Requests Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

    static async deleteMine(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const requestId = String(req.params.requestId || "");
      const deletedRequest = await RequestService.deleteRequesterRequest(
        req.user.id,
        requestId,
      );

      if (!deletedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }

      return res.status(200).json({ message: "Request deleted successfully" });
    } catch (error: any) {
      logger.error(`Delete Request Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getByListing(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const listingId = String(req.params.listingId || "");
      const requests = await RequestService.getDonorRequests(
        req.user.id,
        listingId,
      );

      return res.status(200).json({ requests });
    } catch (error: any) {
      logger.error(`Get Requests Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }


  static async getHistoryOverview(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const history = await RequestService.getHistoryOverview(req.user.id);
      return res.status(200).json(history);
    } catch (error: any) {
      logger.error(`Get History Overview Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getHistoryByListing(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const listingId = String(req.params.listingId || "");
      const requests = await RequestService.getHistoryRequestsForListing(
        req.user.id,
        listingId,
      );

      return res.status(200).json({ requests });
    } catch (error: any) {
      logger.error(`Get History Listing Requests Error: ${error.message}`);
      return res
        .status(400)
        .json({ message: error.message || "Unable to fetch history" });
    }
  }


  static async accept(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { requestId } = requestActionSchema.parse(req.body);
      const result = await RequestService.acceptRequest(req.user.id, requestId);

      return res.status(200).json({
        message: "Request accepted successfully",
        approvedRequest: result.updatedRequest,
        listing: result.updatedListing,
        toastNotificationForOtherRequesters: result.notificationMessage,
        impactedRequestCount: result.affectedRequestsCount,
        autoRejectedRequests: result.autoRejectedRequests || [],
      });
    } catch (error: any) {
      logger.error(`Accept Request Error: ${error.message}`);
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      return res
        .status(400)
        .json({ message: error.message || "Unable to accept request" });
    }
  }

  static async reject(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { requestId } = requestActionSchema.parse(req.body);
      const result = await RequestService.rejectRequest(req.user.id, requestId);

      return res.status(200).json({
        message: "Request rejected successfully",
        rejectedRequest: result.updatedRequest,
        listing: result.updatedListing,
      });
    } catch (error: any) {
      logger.error(`Reject Request Error: ${error.message}`);
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      return res
        .status(400)
        .json({ message: error.message || "Unable to reject request" });
    }
  }
}
