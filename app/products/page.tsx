"use client";

import { addFilter } from "@/lib/slices/slice";
import { products } from "../data";
import ProductCard from "@/components/ProductCard";
import { ProductSchema } from "@/types";
import { Square, SquareCheck } from "lucide-react";
import type { RootState } from "../../lib/store";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const page = () => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: RootState) => state.filters.selectedFilters
  );
  console.log(filters);

  const [filteredProducts, setfilteredProducts] =
    useState<ProductSchema[]>(products);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // filter products by selected filters
    const fetchProducts = () => {
      try {
        const filtered = products.filter((product) => {
          if (filters.length === 0) return true;
          return filters.includes(product.category);
        });
        setfilteredProducts(filtered);
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div>
      <section className="my-20">
        {/* <header>
          <p className="text-xl md:text-3xl mb-6 md:mb-10 font-medium">Browse Products</p>
        </header> */}
        <div className="w-5/6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_75%] gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h5 className="font-medium">Product Categories</h5>
              <div className="flex md:flex-col gap-2">
                <label
                  className="filter_option"
                  onClick={() => dispatch(addFilter("Suits"))}
                >
                  {filters.includes("Suits") ? (
                    <SquareCheck className="size-5" />
                  ) : (
                    <Square className="size-5" />
                  )}
                  Suits
                </label>
                <label
                  className="filter_option"
                  onClick={() => dispatch(addFilter("Cars"))}
                >
                  {filters.includes("Cars") ? (
                    <SquareCheck className="size-5" />
                  ) : (
                    <Square className="size-5" />
                  )}
                  Cars
                </label>
                <label
                  className="filter_option"
                  onClick={() => dispatch(addFilter("Real Estate"))}
                >
                  {filters.includes("Real Estate") ? (
                    <SquareCheck className="size-5" />
                  ) : (
                    <Square className="size-5" />
                  )}
                  Real Estate
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-medium">Sort By</h5>
              <div className="flex md:flex-col gap-2">
                <label className="filter_option">
                  <input type="radio" name="sort" value="Newest" />
                  Newest
                </label>
                <label className="filter_option">
                  <input type="radio" name="sort" value="Oldest" />
                  Oldest
                </label>
              </div>
            </div>
          </div>
          <div className="">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    desc={product.desc}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
