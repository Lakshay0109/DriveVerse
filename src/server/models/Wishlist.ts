import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlist extends Document {
  carId: mongoose.Types.ObjectId;
}

const wishlistSchema = new Schema<IWishlist>({
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true, unique: true },
}, { timestamps: true });

export const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', wishlistSchema);
