"use client";

import Image from "next/image";
import { products } from "@/app/data";
import { ProductSchema } from "@/types";
import { toast } from "sonner";
import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const { name } = params as { name: string };

  const [product, setProduct] = useState<ProductSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [placeOffer, setPlaceOffer] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productData = products.find(
          (product) => product.name === decodeURIComponent(name)
        );
        if (productData) {
          setProduct(productData);
          console.log(productData);
        } else {
          router.push("/products");
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <p>Loading...</p>;

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
            className="mx-auto"
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
                <Input type="number" />
                <Button className="mt-4 w-full">Submit Offer</Button>
              </div>
            ) : (
              <Button
                className="mt-4 w-full"
                onClick={() => setPlaceOffer(true)}
              >
                Make Offer
              </Button>
            )}
          </div>
        </div>
        {/* <p>Welcome to the {decodeURIComponent(name)} page</p> */}
      </div>
    </div>
  );
};

export default page;
