import { Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { logger } from "../../config/logger";
import { uploadProfileImageSchema, updateProfileSchema } from "./user.schema";
import { UserService } from "./user.service";

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const profile = await UserService.getProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user: profile });
    } catch (error: any) {
      logger.error(`Get Profile Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const payload = updateProfileSchema.parse(req.body);
      const updatedUser = await UserService.updateProfile(userId, payload);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error: any) {
      logger.error(`Update Profile Error: ${error.message}`);

      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      if (error.message === "Email already in use") {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async uploadProfileImage(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const payload = uploadProfileImageSchema.parse(req.body);
      const result = await UserService.uploadProfileImage(userId, payload);

      return res
        .status(200)
        .json({ message: "Profile image uploaded successfully", ...result });
    } catch (error: any) {
      logger.error(`Upload Profile Image Error: ${error.message}`);

      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      if (error.message === "Cloudinary is not configured") {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
