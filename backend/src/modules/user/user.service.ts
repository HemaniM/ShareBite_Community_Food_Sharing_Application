import User, { IUser } from "./user.model";
import { ENV } from "../../config/env";
import { UpdateProfileDto, UploadProfileImageDto } from "./user.schema";

const cloudinaryUploadUrl = () =>
  `https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD_NAME}/image/upload`;

export class UserService {
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

  static async uploadProfileImage(
    userId: string,
    payload: UploadProfileImageDto,
  ): Promise<{ profileImage: string }> {
    if (!ENV.CLOUDINARY_CLOUD_NAME || !ENV.CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary is not configured");
    }

    const formData = new FormData();
    const extension = payload.mimeType.split("/")[1] || "jpeg";

    formData.append(
      "file",
      `data:${payload.mimeType};base64,${payload.imageData}`,
    );
    formData.append("upload_preset", ENV.CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "sharebite/profile-images");
    formData.append("public_id", `user-${userId}-${Date.now()}.${extension}`);

    const response = await fetch(cloudinaryUploadUrl(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const result = (await response.json()) as { secure_url?: string };

    if (!result.secure_url) {
      throw new Error("Cloudinary did not return secure image URL");
    }

    await User.findByIdAndUpdate(userId, { profileImage: result.secure_url });

    return { profileImage: result.secure_url };
  }
}
