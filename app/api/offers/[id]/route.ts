import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import Offer from "@/models/offer";
import Product from "@/models/product";

// UPDATE OFFER STATUS : /api/offer/:id
// BODY : { status: string }

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {

    console.log('PATCH request', request);
  
    try {
      const { id } = await params;
      const { status } = await request.json();
  
      await connectDB();
  
      const offer = await Offer.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!offer) {
        return new Response("Offer not found", { status: 404 });
      }
  
      if (status === "accepted") {
        // update all other offers for the product to rejected
        await Offer.updateMany(
          { product: offer.product, _id: { $ne: offer._id } },
          { status: "rejected" }
        );
  
        await Product.findByIdAndUpdate(offer.product, {
          dealAccepted: status === "accepted",
          dealPrice: offer.price,
        });
      }
  
      return new Response(JSON.stringify(offer), { status: 200 });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        return new Response(error.response.data, {
          status: error.response.status,
        });
      }
      return new Response("An error occurred while updating the offer", {
        status: 500,
      });
    }
  };
  