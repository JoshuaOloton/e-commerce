"use client";

import CategoryCard from "./CategoryCard";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { categories } from "@/app/data";
import { Ref, use } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearFilters } from "@/lib/slices/slice";

const Categories = ({
  sectionRef,
}: {
  sectionRef: Ref<HTMLDivElement> | undefined;
}) => {

  const dispatch = useDispatch();
  const router = useRouter();
  const navigateToProducts = () => {
    dispatch(clearFilters());
    router.push("/products");
  };

  return (
    <section className="my-20 py-3" id="categories" ref={sectionRef}>
      <div className="w-5/6 max-w-7xl mx-auto">
        <p className="text-xl md:text-2xl mb-6 md:mb-8 font-medium">
          Browse Categories
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
        <div className="my-6 md:my-12 text-center">
          <div onClick={navigateToProducts}>
            <Button className="text-base cursor-pointer w-full py-5">
              View All Products
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
