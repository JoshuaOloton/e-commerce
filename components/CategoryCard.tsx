"use client";

import { addSingleFilter } from "@/lib/slices/slice";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const CategoryCard = ({ name, image }: { name: string; image: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className="ring ring-blue-500/20 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer hover:shadow-lg shadow-cyan-100/20 transition-all duration-700 group"
      onClick={() => {
        dispatch(addSingleFilter(name));
        router.push("/products");
      }}
    >
      <div className="w-4/5 mx-auto flex flex-col gap-4">
        <img
          src={image}
          alt={name}
          className="rounded-sm transition-all duration-700 group-hover:scale-105"
        />
        <Button
          variant={"ghost"}
          className="text-base transition-all group-hover:scale-95 duration-700 cursor-pointer"
        >
          Explore {name}
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
