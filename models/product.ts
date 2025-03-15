import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string;
  dealAccepted?: boolean;
  dealPrice?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: String, required: true }, // Store image URL
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
