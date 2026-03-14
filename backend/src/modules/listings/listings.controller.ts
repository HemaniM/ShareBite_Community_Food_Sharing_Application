import { Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { createListingSchema } from "./listings.schema";
import { ListingsService } from "./listings.service";
import { logger } from "../../config/logger";

export class ListingsController {
  static async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const validatedData = createListingSchema.parse(req.body);
      const listing = await ListingsService.createListing(
        req.user.id,
        validatedData,
      );

      return res.status(201).json({
        message: "Food post created successfully",
        listing,
      });
    } catch (error: any) {
      logger.error(`Create Listing Error: ${error.message}`);
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMine(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const listings = await ListingsService.getMyListings(req.user.id);
      return res.status(200).json({ listings });
    } catch (error: any) {
      logger.error(`Get My Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteMine(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const listingId = String(req.params.listingId || "");
      const deletedListing = await ListingsService.deleteMyListing(
        req.user.id,
        listingId,
      );

      if (!deletedListing) {
        return res.status(404).json({ message: "Food post not found" });
      }

      return res
        .status(200)
        .json({ message: "Food post deleted successfully" });
    } catch (error: any) {
      logger.error(`Delete Listing Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
