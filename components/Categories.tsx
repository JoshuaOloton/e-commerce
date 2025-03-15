"use client";

import { categories } from "@/app/data";
import { Button } from "./ui/button";
import { Ref, useRef } from "react";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

const Categories = ({
  sectionRef,
}: {
  sectionRef: Ref<HTMLDivElement> | undefined;
}) => {

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
          <Button className="text-base cursor-pointer w-full">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
