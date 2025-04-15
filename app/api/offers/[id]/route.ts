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

      if (!offer) {
        return new Response("Offer not found", { status: 404 });
      }

      console.log('offer', offer);

      const messageEmoji = status === "accepted" ? "🎉" : "❌";

      // Create a new user notification
      await UserNotification.create({
        title: {
          en: offer.product.name.en,
          yo: offer.product.name.yo,
          ig: offer.product.name.ig,
          ha: offer.product.name.ha
        },
        message: `${messageEmoji} Your offer has been ${status}`,
        // default read is false
        linkUrl: `/products/${offer.product._id}`,
        user: offer.buyer,
      });

      await User.findByIdAndUpdate(offer.buyer._id, {
        $push: { notifications: offer._id },
      });
  
      if (status === "accepted") {
    
        // Send notification to all other buyers and update all other offers for the product to rejected
        const otherOffers = await Offer.find({ product: offer.product, _id: { $ne: offer._id } }).populate("product").populate("buyer");
        for (const otherOffer of otherOffers) {
          await UserNotification.create({
            title: {
              en: otherOffer.product.name.en,
              yo: otherOffer.product.name.yo,
              ig: otherOffer.product.name.ig,
              ha: otherOffer.product.name.ha
            },
            message: `❌ Your offer for has been rejected`,
            linkUrl: `/products/${otherOffer.product._id}`, 
            user: otherOffer.buyer,
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
      console.log('error', error);
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
  