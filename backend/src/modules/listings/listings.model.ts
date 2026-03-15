import mongoose, { Schema, Document } from "mongoose";

export enum ListingStatus {
  AVAILABLE = "available",
  NOT_AVAILABLE = "not available",
  EXPIRED = "expired",
}

export interface IListing extends Document {
  donor: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  category: string;
  ingredients: string[];
  images: string[];
  stock: {
    quantity: number;
    unit: string;
  };
  price: {
    isFree: boolean;
    amount: number;
  };
  contactInfo: {
    phoneNumber: string;
    alternatePhoneNumber?: string;
    email: string;
  };
  location: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };
  expiresAt: Date;
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema: Schema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true, trim: true },
    ingredients: [{ type: String }],
    images: [{ type: String }],
    stock: {
      quantity: { type: Number, required: true, min: 0 },
      unit: { type: String, required: true },
    },
    price: {
      isFree: { type: Boolean, default: true },
      amount: { type: Number, default: 0, min: 0 },
    },
    contactInfo: {
      phoneNumber: { type: String, required: true },
      alternatePhoneNumber: { type: String },
      email: { type: String, required: true },
    },
    location: {
      addressLineOne: { type: String, required: true },
      addressLineTwo: { type: String },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(ListingStatus),
      default: ListingStatus.AVAILABLE,
    },
  },
  { timestamps: true },
);

ListingSchema.index({ donor: 1, createdAt: -1 });

export default mongoose.model<IListing>("Listing", ListingSchema);
