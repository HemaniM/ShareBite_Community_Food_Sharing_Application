import mongoose from "mongoose";
import Request, { RequestStatus } from "../request/request.model";
import Review, { IReview } from "./review.model";
import { CreateReviewDto } from "./review.schema";

const reviewPopulate = {
  path: "reviewer",
  select: "name city district state profileImage",
};

export class ReviewService {
  static async createReview(
    userId: string,
    payload: CreateReviewDto,
  ): Promise<IReview> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const request = await Request.findOne({
        _id: payload.requestId,
        requester: userId,
      }).session(session);

      if (!request) {
        throw new Error("Request not found");
      }

      if (request.status !== RequestStatus.APPROVED) {
        throw new Error("You can only review accepted requests");
      }

      if (request.review) {
        throw new Error("You have already reviewed this donation");
      }

      const review = await Review.create(
        [
          {
            request: request._id,
            listing: request.listingId,
            donor: request.donor,
            reviewer: request.requester,
            rating: payload.rating,
            comment: payload.comment.trim(),
          },
        ],
        { session },
      );

      request.review = review[0]._id as mongoose.Types.ObjectId;
      await request.save({ session });

      await session.commitTransaction();

      return Review.findById(review[0]._id).populate(reviewPopulate).orFail();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async getDonorReviews(
    donorId: string,
    listingId?: string,
  ): Promise<IReview[]> {
    const query: Record<string, string> = { donor: donorId };

    if (listingId) {
      query.listing = listingId;
    }

    return Review.find(query).populate(reviewPopulate).sort({ createdAt: -1 });
  }

  static async getReviewSummary(donorId: string) {
    const [summary] = await Review.aggregate([
      { $match: { donor: new mongoose.Types.ObjectId(donorId) } },
      {
        $group: {
          _id: "$donor",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return {
      averageRating: Number(summary?.averageRating || 0),
      totalReviews: Number(summary?.totalReviews || 0),
    };
  }
}
