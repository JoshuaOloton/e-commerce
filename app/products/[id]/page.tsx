"use client";

import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType, OfferType } from "@/types";
import { MakeOfferSchema } from "@/schemas";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import Image from "next/image";
import z from "zod";
import { ProductSkeleton } from "@/components/LoadingSkeleton";
import OfferCard from "@/components/OfferCard";
import AcceptedOfferDialog from "@/components/AcceptedOfferDialog";


const SingleProduct = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { id } = params as { id: string };

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [placeOffer, setPlaceOffer] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferType[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MakeOfferSchema>>({
    resolver: zodResolver(MakeOfferSchema),
  });

  const updateOffers = (offers: OfferType[]) => setOffers(offers);

  const onSubmit: SubmitHandler<z.infer<typeof MakeOfferSchema>> = async (
    formData
  ) => {
    try {
      const response = await axios.post(`/api/offers`, {
        ...formData,
        productId: id,
        buyerId: session?.user?._id,
      });

      if (response.status === 201) {
        toast.success("Offer submitted successfully");
        router.push("/products");
      }

    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred while submitting offer");
      }
    }
  };

  useEffect(() => {
    const fetchProductandOffer = async () => {
      if (!session) return;

      try {
        const productRes = await axios.get(`/api/products/${id}`);

        setProduct(productRes.data);
        setOffers(productRes.data.offers);
        console.log(productRes.data.offers);

      } catch (error: unknown) {
        console.log(error);

        if (error instanceof AxiosError && error.response) {
          toast.error(error.response?.data);
        } else {
          toast.error("An error occurred while fetching product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductandOffer();
  }, [id, session]);

  useEffect(() => {
    if (!session || !product) return;

    if (session.user.role === "user") {
      const offer = product.offers.find(
        (offer) => offer.buyer._id === session.user._id
      );
      console.log(offer);

      setOffers(offer ? [offer] : []);
    } else { // if ADMIN or SELLER
      setOffers(product.offers);
    }

  }, [product, session]);

  // useEffect(() => {
  //   console.log("Offers status => ", offers.map(offer => offer.status));
  // }, [offers]);

  const showOfferStatus = (status: string) => {
    switch(status) {
      case "pending":
        return (
          <div>
              <p className="text-sm text-gray-500 mt-4">
                You have already made an offer for this product.
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Your Offer Price:{" "}
                <span className="text-green-600">N{offers[0].price}</span>
              </p>
            </div>
        );
      case "accepted":
        return (
          <div className="my-4 p-4 border rounded-md bg-green-100 text-green-800">
            <p className="font-semibold">Offer Accepted!</p>
            <p className="text-sm">Contact the seller to arrange payment and delivery details.</p>
            <div className="mt-2 flex gap-4">
              <a href={`tel:234000000000`} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Call Seller
              </a>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Mark as Completed
              </button>
            </div>
          </div>
        );
      case "rejected":
        return (
          <div>
            <p className="text-sm text-gray-500 mt-4">
              ❌ Your offer has been rejected.
            </p>
            <p className="text-lg font-semibold text-red-500">
              Your Offer Price:{" "}
              <span className="">N{offers[0].price}</span>
            </p>
          </div>
        )
    }
  }

  if (loading)
    return (
      <ProductSkeleton />
    );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <div className="p-4 w-3/4 sm:w-5/6 max-w-5xl flex flex-col sm:flex-row gap-1 md:gap-6">
        <div className="bg-gray-100 flex-1/2 p-4 rounded">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="mx-auto w-full"
          />
        </div>
        <div className="my-8 flex-1/2">
          <h1 className="font-bold text-lg md:text-xl mb-2">{product.name}</h1>
          <p className="uppercase text-sm tracking-widest text-gray-700">
            {product.category}
          </p>
          <p>Starting Price?: N{product.price}</p>
          <div className="mt-4">
            <h5 className="font-bold">Description</h5>
            <p>{product.desc}</p>
            {session?.user.role === "user" ? (
              offers.length > 0 ? (
                showOfferStatus(offers[0].status)
              ) : placeOffer ? (
                <div className="mt-4">
                  <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <label>
                      <span className="text-gray-700 text-sm font-medium">
                        Offer Price <span className="text-red-900">*</span>
                      </span>
                    </label>
                    <Input {...register("offerPrice")} type="number" />
                    <Button
                      className="mt-4 w-full cursor-pointer"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Submit Offer"}
                    </Button>
                    {errors.offerPrice && (
                      <span className="error_span">
                        {errors.offerPrice.message}
                      </span>
                    )}
                  </form>
                </div>
              ) : (
                <Button
                  className="mt-4 w-full cursor-pointer"
                  onClick={() => setPlaceOffer(true)}
                >
                  Make Offer
                </Button>
              )
            ) : (
              // <Button className="mt-4 cursor-pointer">View Offers on Product</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 cursor-pointer">
                    View Offers on Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Offers made to Product</DialogTitle>
                    <DialogDescription>
                      Total Offers: {product.offers.length}
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-60">
                    {offers.length > 0 ? (
                      offers.map((offer) => (
                        <OfferCard key={offer._id} offer={offer} updateOffers={updateOffers} offers={offers} />
                      ))
                    ) : (
                      <p className="text-gray-500">No offers yet.</p>
                    )}
                  </ScrollArea>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant={"secondary"}>Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
