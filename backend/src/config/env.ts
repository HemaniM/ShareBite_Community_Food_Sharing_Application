import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  JWT_SECRET: process.env.JWT_SECRET ?? "sharebite",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET ?? "",
};
