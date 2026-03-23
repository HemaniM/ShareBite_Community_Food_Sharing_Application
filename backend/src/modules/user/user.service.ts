import Review from "../review/review.model";
import { ReviewService } from "../review/review.service";
import User, { IUser } from "./user.model";
import { UpdateProfileDto } from "./user.schema";

export class UserService {
  static async getPublicProfile(userId: string) {
    const user = await User.findById(userId)
      .select(
        "name email phone about address city district state pincode profileImage isTrusted role createdAt",
      )
      .lean();

    if (!user) {
      return null;
    }

    const reviews = await Review.find({ donor: userId })
      .populate("reviewer", "name city district state profileImage")
      .sort({ createdAt: -1 })
      .lean();
    const summary = await ReviewService.getReviewSummary(userId);

    return {
      ...user,
      reviews,
      ...summary,
      isTrusted: Boolean(user.isTrusted) || summary.averageRating >= 4,
    };
  }

  static async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return null;
    }

    const reviews = await Review.find({ donor: userId })
      .populate("reviewer", "name city district state profileImage")
      .sort({ createdAt: -1 })
      .lean();
    const summary = await ReviewService.getReviewSummary(userId);

    return {
      ...user,
      reviews,
      ...summary,
      isTrusted: Boolean(user.isTrusted) || summary.averageRating >= 4,
    };
  }

  static async updateProfile(
    userId: string,
    payload: UpdateProfileDto,
  ): Promise<IUser | null> {
    if (payload.email) {
      const emailOwner = await User.findOne({
        email: payload.email,
        _id: { $ne: userId },
      });
      if (emailOwner) {
        throw new Error("Email already in use");
      }
    }

    return User.findByIdAndUpdate(userId, payload, { new: true }).select(
      "-password",
    );
  }
}
