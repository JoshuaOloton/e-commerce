import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import mongoose from "mongoose";
import Product from "@/models/Product";


export const GET = async(request: Request, { params } : { params: Promise<{ id: string }> }) => {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Wait for and extract 'id' parameter from request and validate
    const { id } = await params;

    // check valid objectId
    if (!mongoose.isValidObjectId(id)) {
      return new Response("Invalid product ID.", { status: 400 });
    }
  
    // Find product by ID and populate its related offers
    const product = await Product.findById(id).populate({
      path: "offers",
      populate: {
        path: "buyer",
        select: "name email",
      }
    });
    
    // If product is not found, return a 404 error response
    if (!product) {
      return new Response("Product not found.", { status: 404 });
    }
    
    // Return product details along with populated offers and buyers as a JSON response
    return Response.json(product, { status: 200 });

  } catch (error: unknown) {
    console.log('API error: ', error);
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, { status: error.response.status });
    }

    // Return a generic 500 error response if something else went wrong
    return new Response("An error occurred while fetching product.", { status: 500 });
  }
}