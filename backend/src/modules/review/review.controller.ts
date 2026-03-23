import { Request, Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { logger } from "../../config/logger";
import { createReviewSchema } from "./review.schema";
import { ReviewService } from "./review.service";

export class ReviewController {
  static async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const payload = createReviewSchema.parse(req.body);
      const review = await ReviewService.createReview(req.user.id, payload);

      return res.status(201).json({
        message: "Review submitted successfully",
        review,
      });
    } catch (error: any) {
      logger.error(`Create Review Error: ${error.message}`);
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      return res
        .status(400)
        .json({ message: error.message || "Unable to submit review" });
    }
  }

  static async getForDonor(req: Request, res: Response) {
    try {
      const donorId = String(req.params.donorId || "");
      const listingId =
        typeof req.query.listingId === "string"
          ? req.query.listingId
          : undefined;

      const reviews = await ReviewService.getDonorReviews(donorId, listingId);
      const summary = await ReviewService.getReviewSummary(donorId);

      return res.status(200).json({ reviews, ...summary });
    } catch (error: any) {
      logger.error(`Get Donor Reviews Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
