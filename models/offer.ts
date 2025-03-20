import mongoose, { Schema, Document } from "mongoose";

interface IOffer extends Document {
  price: number;
  status: string;
  buyer: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
}

const OfferSchema = new Schema<IOffer>(
  {
    price: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: "pending",
      index: true,
      enum: ["pending", "accepted", "rejected"],
    },
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const Offer =
  mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;
