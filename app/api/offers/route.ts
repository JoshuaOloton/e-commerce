import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import { type NextRequest } from "next/server";
import AdminNotification from "@/models/AdminNotification";
import mongoose from "mongoose";
import Offer from "@/models/Offer";
import Product from "@/models/Product";
import User from "@/models/User";

// POST NEW OFFER : /api/offers
// BODY : { buyerId: string, productId: string, offerPrice: number }
export const POST = async (request: Request) => {
  try {
    const { buyerId, productId, offerPrice } = await request.json();

    await connectDB();

    const offer = new Offer({
      price: offerPrice,
      status: "pending",
      buyer: buyerId,
      product: productId,
    });
    await offer.save();
    await offer.populate("buyer");
    await offer.populate("product");

    // Update product and user with new offer
    await Product.findByIdAndUpdate(productId, {
      $push: { offers: offer._id },
    });

    await User.findByIdAndUpdate(buyerId, {
      $push: { offers: offer._id },
    });

    // Create a new admin notification
    await AdminNotification.create({
      title: {
        en: offer.product.name.en,
        yo: offer.product.name.yo,
        ig: offer.product.name.ig,
        ha: offer.product.name.ha
      },
      message: `🎉 ${offer.buyer.name} has offered ${offerPrice}.`,
      linkUrl: `/products/${productId}`,
      // default read is false
    });

    return new Response(JSON.stringify(offer), { status: 201 });

  } catch (error: unknown) {
    
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, {
        status: error.response.status,
      });
    } else {
      return new Response(`An error occurred while creating the offer: ${String(error)}.`, {
        status: 500,
      });
    }
  }
};

// GET ALL OFFERS : /api/offers
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");
    const buyerId = searchParams.get("buyerId");

    // check buyerId and productId are valid objectid
    if (buyerId && !mongoose.isValidObjectId(buyerId)) {
      return new Response("Invalid buyerId", { status: 400 });
    }

    if (productId && !mongoose.isValidObjectId(productId)) {
      return new Response("Invalid productId", { status: 400 });
    }

    let offers = [];
    if (buyerId && productId) {
      offers = await Offer.find({ buyerId, productId }).populate("buyer");
    } else if (buyerId) {
      offers = await Offer.find({ buyerId }).populate("buyer");
    } else if (productId) {
      offers = await Offer.find({ productId }).populate("buyer");
    } else {
      offers = await Offer.find();
    }

    offers.sort((a, b) => b.createdAt - a.createdAt);

    return Response.json(offers, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, {
        status: error.response.status,
      });
    }
    return new Response(`An error occurred while fetching offers: ${String(error)}`, {
      status: 500,
    });
  }
};
