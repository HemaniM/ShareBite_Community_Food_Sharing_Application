import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  request: mongoose.Types.ObjectId;
  listing: mongoose.Types.ObjectId;
  donor: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
  {
    request: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true,
      unique: true,
    },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

ReviewSchema.index({ donor: 1, createdAt: -1 });
ReviewSchema.index({ listing: 1, createdAt: -1 });
ReviewSchema.index({ reviewer: 1, createdAt: -1 });

export default mongoose.model<IReview>("Review", ReviewSchema);
