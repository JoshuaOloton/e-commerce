import { connectDB } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/models/product";
import Offer from "@/models/offer";

export const POST = async({ req } : { req: Request}) => {
  try {
    const { buyerId, productId, price } = await req.json();
    await connectDB();

    const offer = new Offer({ buyerId, productId, price, status: "pending" });
    await offer.save();

    // update product with dealAccepted and dealPrice
    await Product.findByIdAndUpdate(productId, { dealAccepted: true, dealPrice: price });

    return new Response(JSON.stringify(offer), { status: 201 });
  } catch (error: any) {
    return new Response(error.message || "An error occurred while creating the offer", { status: 500 });
  }
}