import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import mongoose from "mongoose";
import Product from "@/models/product";


export const GET = async(request: Request, { params } : { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();

    const { id } = await params;

    // check valid objectId
    if (!mongoose.isValidObjectId(id)) {
      return new Response("Invalid product ID.", { status: 400 });
    }
  
    const product = await Product.findById(id).populate({
      path: "offers",
      populate: {
        path: "buyer",
        select: "name email",
      }
    });
    
    if (!product) {
      return new Response("Product not found.", { status: 404 });
    }
    
    return Response.json(product, { status: 200 });

  } catch (error: unknown) {
    console.log('API error: ', error);
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, { status: error.response.status });
    }
    return new Response("An error occurred while fetching product.", { status: 500 });
  }
}