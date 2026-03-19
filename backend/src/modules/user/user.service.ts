import User, { IUser } from "./user.model";
import { UpdateProfileDto } from "./user.schema";

export class UserService {
  static async getPublicProfile(userId: string): Promise<IUser | null> {
    return User.findById(userId).select(
      "name email phone about address city district state pincode profileImage isTrusted role createdAt",
    );
  }

  static async getProfile(userId: string): Promise<IUser | null> {
    return User.findById(userId).select("-password");
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
