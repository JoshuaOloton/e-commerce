import { connectDB } from "@/utils/db";
import Product from "@/models/product";
import mongoose from "mongoose";


export const GET = async(request: Request, { params } : { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();

    const { id } = await params;

    // check valid objectId
    if (!mongoose.isValidObjectId(id)) {
      return new Response("Invalid product ID.", { status: 400 });
    }
  
    const product = await Product.findById(id);
    if (!product) {
      return new Response("Product not found.", { status: 404 });
    }
    
    return Response.json(product, { status: 200 });
  } catch (error: any) {
    return new Response(error.message || "An error occurred while fetching product.", { status: 500 });
  }
}