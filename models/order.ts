import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
