import { connectDB } from "@/utils/db";
import Product from "@/models/product";

export const GET = async() => {
  try {
    await connectDB();
    
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
    
  } catch (error: any) {
    return new Response(error.message || "An error occurred while fetching the products.", { status: 500 });
  }
}