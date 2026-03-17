import { Router } from "express";
import { protect } from "../../common/middleware/auth.middleware";
import { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.get("/profile", protect, UserController.getProfile);
userRouter.put("/profile", protect, UserController.updateProfile);
userRouter.post("/profile/image", protect, UserController.uploadProfileImage);
