import { Router } from "express";
import { ListingsController } from "./listings.controller";
import { protect } from "../../common/middleware/auth.middleware";

export const listingsRouter = Router();

listingsRouter.get("/", ListingsController.getActive);
listingsRouter.get("/home/food-near-you", ListingsController.getFoodNearYou);
listingsRouter.get(
  "/home/recently-uploaded",
  ListingsController.getRecentlyUploaded,
);
listingsRouter.get("/home/filtered", ListingsController.getHomepageFiltered);
listingsRouter.post("/", protect, ListingsController.create);
listingsRouter.get("/my", protect, ListingsController.getMine);
listingsRouter.delete("/:listingId", protect, ListingsController.deleteMine);
