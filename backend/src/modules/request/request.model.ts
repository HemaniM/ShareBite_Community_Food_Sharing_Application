import mongoose, { Schema, Document } from "mongoose";

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface IRequest extends Document {
  listingId: mongoose.Types.ObjectId;
  requester: mongoose.Types.ObjectId;
  donor: mongoose.Types.ObjectId;
  requestedQuantity: number;
  status: RequestStatus;
  message?: string;
  donorToastMessage?: string;
  acceptedAt?: Date;
  review?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema: Schema = new Schema(
  {
    listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requestedQuantity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: Object.values(RequestStatus),
      default: RequestStatus.PENDING,
    },
    message: { type: String },
    donorToastMessage: { type: String },
    acceptedAt: { type: Date },
    review: { type: Schema.Types.ObjectId, ref: "Review", default: null },
  },
  { timestamps: true },
);

RequestSchema.index({ listingId: 1, status: 1, createdAt: -1 });
RequestSchema.index({ requester: 1, createdAt: -1 });

export default mongoose.model<IRequest>("Request", RequestSchema);
