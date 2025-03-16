import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  desc: string;
  price: number;
  category: string;
  image: string;
  dealAccepted: boolean;
  dealPrice?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true }, // Store image URL
    dealAccepted: { type: Boolean, required: true, default: false, index: true },
    dealPrice: { type: Number, required: false },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
