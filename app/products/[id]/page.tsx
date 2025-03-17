"use client";

import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/types";
import { OfferSchema } from "@/schemas";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { id } = params as { id: string };

  const [product, setProduct] = useState<ProductSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [placeOffer, setPlaceOffer] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof OfferSchema>>({
    resolver: zodResolver(OfferSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof OfferSchema>> = async (
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
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        console.log(response);

        const { data } = response;
        setProduct(data);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col items-center justify-center my-10">
        <div className="p-4 w-3/4 sm:w-5/6 max-w-5xl  flex flex-col sm:flex-row gap-1 md:gap-6">
          <div className="bg-gray-100 flex-1/2 p-4 rounded">
            <div className="animate-pulse bg-gray-300 w-full h-96 rounded"></div>
          </div>
          <div className="my-8 flex-1/2">
            <div className="animate-pulse bg-gray-300 w-1/2 h-6 mb-2 rounded"></div>
            <div className="animate-pulse bg-gray-300 w-1/4 h-6 mb-2 rounded"></div>
            <div className="animate-pulse bg-gray-300 w-1/2 h-6 mb-2 rounded"></div>
            <div className="animate-pulse bg-gray-300 w-1/2 h-6 mb-2 rounded"></div>
            <div className="animate-pulse bg-gray-300 w-1/2 h-6 mb-2 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <div className="p-4 w-3/4 sm:w-5/6 max-w-5xl  flex flex-col sm:flex-row gap-1 md:gap-6">
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
            {placeOffer ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
