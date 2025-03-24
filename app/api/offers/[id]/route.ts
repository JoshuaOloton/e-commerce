import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import Offer from "@/models/Offer";
import Product from "@/models/Product";
import UserNotification from "@/models/UserNotification";
import User from "@/models/User";

// UPDATE OFFER STATUS : /api/offer/:id
// BODY : { status: string }

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  
    try {
      const { id } = await params;
      const { status } = await request.json();
  
      await connectDB();
  
      const offer = await Offer.findByIdAndUpdate(id, { status }, { new: true }).populate("product").populate("buyer");
  
      console.log("Offer => ", offer);

      if (!offer) {
        return new Response("Offer not found", { status: 404 });
      }

      const messageEmoji = status === "accepted" ? "🎉" : "❌";

      // Create a new user notification
      await UserNotification.create({
        title: offer.product.name,
        message: `${messageEmoji} Your offer has been ${status}`,
        // default read is false
        linkUrl: `/products/${offer.product._id}`,
      });

      await User.findByIdAndUpdate(offer.buyer, {
        $push: { notifications: offer._id },
      });
  
      if (status === "accepted") {
    
        // await Offer.updateMany(
        //   { product: offer.product, _id: { $ne: offer._id } },
        //   { status: "rejected" }
        // );

        // Send notification to all other buyers and update all other offers for the product to rejected
        const otherOffers = await Offer.find({ product: offer.product, _id: { $ne: offer._id } });
        for (const otherOffer of otherOffers) {
          await UserNotification.create({
            user: otherOffer.buyer,
            message: `❌ Your offer for the product ${offer.product} has been rejected`,
          });

          await User.findByIdAndUpdate(otherOffer.buyer, {
            $push: { notifications: otherOffer._id },
          });

          otherOffer.status = "rejected";
          await otherOffer.save();
        }
  
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
  