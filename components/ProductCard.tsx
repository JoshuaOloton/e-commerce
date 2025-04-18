import Image from "next/image";
import Link from "next/link";
import { objectSchema } from "@/types";
import { useSession } from "next-auth/react";

const ProductCard = ({
  id,
  name,
  image,
  desc,
  price,
  priceLang
}: {
  id: string;
  name: objectSchema;
  image: string;
  desc: objectSchema;
  price: number;
  priceLang: objectSchema;
}) => {
  const { data: session } = useSession();
  const userLang = session?.user?.language || "en"; // fallback to English

  return (
    <Link
      className="ring ring-blue-500/20 p-4 rounded-lg bg-gray-50 hover:bg-gray-200 cursor-pointer hover:shadow-lg shadow-cyan-500/20 transition-all duration-700 group"
      href={`/products/${id}`}
    >
      <div className="w-4/5 mx-auto flex flex-col gap-6 ">
        <div className="w-52 h-52 mx-auto relative">
          <Image
            src={image}
            alt={name.en}
            fill={true}
            // width={300}
            // height={300}
            className="object-cover rounded-sm transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <h3 className="font-bold lg:text-lg mb-3">{name[userLang]}</h3>
          <p className="text-sm leading-6 tracking-wide mb-2">
            {desc[userLang].slice(0, 40)}...
          </p>
          <span className="text-sm text-gray-500">N{price} ({priceLang[userLang]})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
