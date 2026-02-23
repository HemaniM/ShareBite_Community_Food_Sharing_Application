import mongoose, { Schema, Document } from 'mongoose';

export enum ListingStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
  EXPIRED = 'expired'
}

export interface IListing extends Document {
  donor: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  quantity: string; // e.g., "3 Plates"
  price: number; // 0 for Free
  category: mongoose.Types.ObjectId;
  isNonVeg: boolean;
  allergens: string[];
  ingredients: string[];
  locationOverride?: string;
  contactOverride?: string;
  images: string[];
  status: ListingStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema: Schema = new Schema({
  donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  quantity: { type: String, required: true },
  price: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  isNonVeg: { type: Boolean, default: false },
  allergens: [{ type: String }],
  ingredients: [{ type: String }],
  locationOverride: { type: String },
  contactOverride: { type: String },
  images: [{ type: String }],
  status: { type: String, enum: Object.values(ListingStatus), default: ListingStatus.AVAILABLE },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

ListingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IListing>('Listing', ListingSchema);