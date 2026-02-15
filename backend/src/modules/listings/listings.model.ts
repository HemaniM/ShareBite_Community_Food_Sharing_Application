import mongoose, { Schema, Document } from 'mongoose';

export enum ListingCategory {
  COOKED = 'cooked',
  RAW = 'raw',
  PACKAGED = 'packaged'
}

export enum ListingStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
  EXPIRED = 'expired'
}

export interface IListing extends Document {
  donor: mongoose.Types.ObjectId; // Reference to User
  title: string;
  description?: string;
  quantity: string;
  category: ListingCategory;
  isNonVeg: boolean;
  allergens: string[];
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
  category: {
    type: String,
    enum: Object.values(ListingCategory),
    required: true
  },
  isNonVeg: { type: Boolean, default: false },
  allergens: [{ type: String }],
  images: [{ type: String }],
  status: {
    type: String,
    enum: Object.values(ListingStatus),
    default: ListingStatus.AVAILABLE
  },
  expiresAt: { type: Date, required: true }
}, { timestamps: true }); // Automatically handles createdAt and updatedAt

// Index for expiry
ListingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IListing>('Listing', ListingSchema);