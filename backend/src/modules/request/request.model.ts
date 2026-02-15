import mongoose, { Schema, Document } from 'mongoose';

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed', // Handover done
  CANCELLED = 'cancelled'
}

export interface IRequest extends Document {
  listingId: mongoose.Types.ObjectId;
  requester: mongoose.Types.ObjectId;
  donor: mongoose.Types.ObjectId;
  status: RequestStatus;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema: Schema = new Schema({
  listingId: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  donor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Denormalized for query speed
  status: {
    type: String,
    enum: Object.values(RequestStatus),
    default: RequestStatus.PENDING
  },
  message: { type: String }
}, { timestamps: true });

export default mongoose.model<IRequest>('Request', RequestSchema);