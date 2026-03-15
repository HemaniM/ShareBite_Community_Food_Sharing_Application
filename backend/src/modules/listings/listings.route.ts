import { Router } from "express";
import { ListingsController } from "./listings.controller";
import { protect } from "../../common/middleware/auth.middleware";

export const listingsRouter = Router();

listingsRouter.get("/", ListingsController.getActive);
listingsRouter.post("/", protect, ListingsController.create);
listingsRouter.get("/my", protect, ListingsController.getMine);
listingsRouter.delete("/:listingId", protect, ListingsController.deleteMine);
