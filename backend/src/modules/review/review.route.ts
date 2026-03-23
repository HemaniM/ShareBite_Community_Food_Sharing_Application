import { Router } from "express";
import { protect } from "../../common/middleware/auth.middleware";
import { ReviewController } from "./review.controller";

export const reviewRouter = Router();

reviewRouter.post("/", protect, ReviewController.create);
reviewRouter.get("/donor/:donorId", protect, ReviewController.getForDonor);