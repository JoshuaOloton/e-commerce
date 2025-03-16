import mongoose, { Schema, Document } from "mongoose";

interface IOffer extends Document {
  buyerId: string;
  productId: string;
  price: number;
  status: string;
}

const OfferSchema = new Schema<IOffer>(
  {
    buyerId: { type: String, required: true, index: true },
    productId: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: "pending", index: true },
  },
  { timestamps: true }
);

const Offer = mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;
