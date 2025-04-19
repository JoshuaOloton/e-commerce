import mongoose, { Schema, Document } from "mongoose";
import Offer from "./Offer";

interface IProduct extends Document {
  name: {
    en: string,
    yo: string,
    ig: string,
    ha: string
  };
  desc: string;
  price: number;
  priceLang: {
    en: string,
    yo: string,
    ig: string,
    ha: string
  };
  category: string;
  image: string;
  dealAccepted: boolean;
  dealPrice?: number;
  offers: Schema.Types.ObjectId[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      en: { type: String, required: true, unique: true },
      yo: { type: String, required: true, unique: true },
      ig: { type: String, required: true, unique: true },
      ha: { type: String, required: true, unique: true }
     },
    desc: { 
      en: { type: String, required: true, unique: true },
      yo: { type: String, required: true, unique: true },
      ig: { type: String, required: true, unique: true },
      ha: { type: String, required: true, unique: true }
     },
    price: { type: Number, required: true },
    priceLang: {
      en: { type: String, required: true, unique: true },
      yo: { type: String, required: true, unique: true },
      ig: { type: String, required: true, unique: true },
      ha: { type: String, required: true, unique: true }
    },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true }, // Store image URL
    dealAccepted: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    dealPrice: { type: Number, required: false },
    offers: [{ type: Schema.Types.ObjectId, ref: Offer}],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
