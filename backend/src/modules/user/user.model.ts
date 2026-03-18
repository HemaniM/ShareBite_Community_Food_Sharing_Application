import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  INDIVIDUAL = "individual",
  RESTAURANT = "restaurant",
  NGO = "ngo",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using OAuth later, but required for email/pass
  phone?: string;
  gender?: string;
  about?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  profileImage?: string;
  isTrusted: boolean;
  role: UserRole;
  isVerified: boolean;
  verificationDocuments: string[]; // URLs
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
    address?: string;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String, default: "Prefer not to say" },
    about: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    district: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    isTrusted: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.INDIVIDUAL,
    },
    isVerified: { type: Boolean, default: false },
    verificationDocuments: [{ type: String }],
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
      address: { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
