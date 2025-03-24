import Product from "@/models/Product";
import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";

export const GET = async() => {
  try {
    await connectDB();
    
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
    
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, { status: error.response.status });
    }
    return new Response("An error occurred while fetching the products.", { status: 500 });
  }
}