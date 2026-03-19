import { Request, Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { logger } from "../../config/logger";
import { updateProfileSchema } from "./user.schema";
import { UserService } from "./user.service";

export class UserController {
  static async getPublicProfile(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;

      const profile = await UserService.getPublicProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user: profile });
    } catch (error: any) {
      logger.error(`Get Public Profile Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

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
}
