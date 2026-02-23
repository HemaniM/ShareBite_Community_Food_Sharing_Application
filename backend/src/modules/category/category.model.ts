import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;      // e.g., "Fast Food"
    slug: string;      // e.g., "fast-food"
    imageUrl?: string; // Icon for the frontend
    isActive: boolean; // Admin can toggle categories off without deleting them
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);