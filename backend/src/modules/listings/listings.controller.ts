import { Response } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { createListingSchema } from "./listings.schema";
import { ListingsService } from "./listings.service";
import { logger } from "../../config/logger";

export class ListingsController {
  static async getActive(_req: AuthRequest, res: Response) {
    try {
      const listings = await ListingsService.getActiveListings();
      return res.status(200).json({ listings });
    } catch (error: any) {
      logger.error(`Get Active Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }


  static async getFoodNearYou(req: AuthRequest, res: Response) {
    try {
      const result = await ListingsService.getFoodNearYouListings({
        city: typeof req.query.city === "string" ? req.query.city : "",
        district:
          typeof req.query.district === "string" ? req.query.district : "",
        state: typeof req.query.state === "string" ? req.query.state : "",
        country:
          typeof req.query.country === "string" ? req.query.country : "",
        pincode:
          typeof req.query.pincode === "string" ? req.query.pincode : "",
        // limit: typeof req.query.limit === "string" ? Number(req.query.limit) : 8,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      logger.error(`Get Food Near You Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }


  static async getRecentlyUploaded(req: AuthRequest, res: Response) {
    try {
      const result = await ListingsService.getRecentlyUploadedListings({
        hours: typeof req.query.hours === "string" ? Number(req.query.hours) : 12,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      logger.error(`Get Recently Uploaded Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMostTrustedDonorListings(req: AuthRequest, res: Response) {
    try {
      const result = await ListingsService.getMostTrustedDonorListings({
        minRating:
          typeof req.query.minRating === "string"
            ? Number(req.query.minRating)
            : 4,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      logger.error(`Get Most Trusted Donor Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getHomepageFiltered(req: AuthRequest, res: Response) {
    try {
      const result = await ListingsService.getHomepageFilteredListings({
        location:
          typeof req.query.location === "string" ? req.query.location : "",
        category:
          typeof req.query.category === "string" ? req.query.category : "",
        budget: typeof req.query.budget === "string" ? req.query.budget : "",
      });

      return res.status(200).json(result);
    } catch (error: any) {
      logger.error(`Get Homepage Filtered Listings Error: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

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
